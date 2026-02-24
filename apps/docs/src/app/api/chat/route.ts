import { groq, GROQ_CONFIG } from '@/features/chat/lib/groq-client';
import { getSystemPrompt } from '@/features/chat/lib/system';
import { generateText } from 'ai';
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

    const { text } = await generateText({
      model: groq(GROQ_CONFIG.model),
      system: systemPrompt,
      messages: normalizedMessages,
      temperature: GROQ_CONFIG.temperature,
      maxOutputTokens: GROQ_CONFIG.maxTokens,
      topP: GROQ_CONFIG.topP,
    });

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error('Groq API Error:', error);

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
