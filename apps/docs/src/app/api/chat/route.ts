import { createAgentUIStreamResponse } from '@repo/ai';
import { nachUIAgent } from '@repo/ai/agent';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const { messages }: { messages: unknown[] } = await req.json();

  return createAgentUIStreamResponse({
    agent: nachUIAgent,
    uiMessages: messages,
  });
}
