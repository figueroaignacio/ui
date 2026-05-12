import { Injectable, Logger } from '@nestjs/common';
import { nachUIAgent } from '@repo/ai';
import { pipeAgentUIStreamToResponse } from 'ai';
import type { Response } from 'express';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  async streamChat(messages: unknown[], res: Response, abortSignal?: AbortSignal): Promise<void> {
    await pipeAgentUIStreamToResponse({
      response: res,
      agent: nachUIAgent,
      uiMessages: messages,
      abortSignal,
      onStepFinish: ({ usage, toolCalls }) => {
        this.logger.log(
          `Step finished | Tokens: ${usage?.inputTokens ?? 0}in/${usage?.outputTokens ?? 0}out`,
        );
        if (toolCalls && toolCalls.length > 0) {
          for (const call of toolCalls) {
            this.logger.log(`Tool: ${call.toolName}`);
          }
        }
      },
      onError: (err: unknown) => {
        const error = err instanceof Error ? err : new Error(String(err));
        this.logger.error(`Chat stream error: ${error.message}`, error.stack);

        return 'An error occurred processing your request. Please try again.';
      },
    });
  }
}
