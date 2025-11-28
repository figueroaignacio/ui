import { groq, GROQ_CONFIG } from '@/lib/groq-client';
import { getSystemPrompt } from '@/lib/system';
import { NextRequest, NextResponse } from 'next/server';

// Utilities

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.some((m) => !m.role || !m.content)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }
    const sanitizedMessages = messages.slice(-5);

    const normalizedMessages = sanitizedMessages.map((m) => ({
      role: m.role,
      content: Array.isArray(m.content)
        ? m.content.map((c: { text: string }) => c.text || '').join('\n')
        : String(m.content),
    }));

    const systemPrompt = await getSystemPrompt(normalizedMessages);

    const estimatedTokens = Math.ceil(
      (systemPrompt.length + normalizedMessages.reduce((acc, m) => acc + m.content.length, 0)) / 4,
    );

    console.log(`📊 Estimated tokens: ${estimatedTokens}`);

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'system', content: systemPrompt }, ...normalizedMessages],
      model: GROQ_CONFIG.model,
      temperature: GROQ_CONFIG.temperature,
      max_tokens: 800,
      top_p: GROQ_CONFIG.topP,
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
