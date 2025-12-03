import { groq, GROQ_CONFIG } from '@/features/chat/lib/groq-client';
import { getSystemPrompt } from '@/features/chat/lib/system';
import { NextRequest, NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

function normalizeMessages(messages: unknown[]): Message[] {
  return messages.map((m: any) => ({
    role: m.role,
    content: Array.isArray(m.content)
      ? m.content.map((c: { text: string }) => c.text || '').join('\n')
      : String(m.content),
  }));
}

function validateMessages(messages: unknown): messages is Message[] {
  return (
    Array.isArray(messages) &&
    messages.every(
      (m: any) =>
        m &&
        typeof m === 'object' &&
        ['user', 'assistant', 'system'].includes(m.role) &&
        (typeof m.content === 'string' || Array.isArray(m.content)),
    )
  );
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!validateMessages(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const sanitizedMessages = messages.slice(-5);
    const normalizedMessages = normalizeMessages(sanitizedMessages);

    const systemPrompt = await getSystemPrompt(normalizedMessages);

    const totalContent = systemPrompt + normalizedMessages.map((m) => m.content).join('\n');

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'system', content: systemPrompt }, ...normalizedMessages],
      model: GROQ_CONFIG.model,
      temperature: 0.5,
      max_tokens: 2048,
      top_p: 0.9,
      stream: false,
    });

    const reply =
      completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error('❌ Groq API Error:', error);

    const err = error as { status?: number; message?: unknown } | undefined;

    if (
      err?.status === 413 ||
      (typeof err?.message === 'string' && err.message.includes('rate_limit_exceeded'))
    ) {
      return NextResponse.json(
        {
          error: 'The message is too long. Please try a shorter message.',
          details: 'Token limit exceeded',
        },
        { status: 413 },
      );
    }

    return NextResponse.json(
      {
        error:
          typeof err?.message === 'string'
            ? err.message
            : String(error) || 'Failed to process chat request',
      },
      { status: 500 },
    );
  }
}
