import { createAgentUIStreamResponse } from '@repo/ai';
import { nachUIAgent } from '@repo/ai/agent';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const chatRequestSchema = z.object({
  messages: z.array(
    z.object({
      role: z.enum(['user', 'assistant', 'system']),
      content: z.string(),
    }),
  ),
});

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = chatRequestSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { error: 'Invalid request body', details: result.error.flatten() },
      { status: 400 },
    );
  }

  return createAgentUIStreamResponse({
    agent: nachUIAgent,
    uiMessages: result.data.messages,
  });
}
