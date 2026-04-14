import { Injectable } from '@nestjs/common';
import { nachUIAgent } from '@repo/ai';
import { pipeAgentUIStreamToResponse } from 'ai';
import type { Response } from 'express';

@Injectable()
export class ChatService {
  async streamChat(messages: unknown[], res: Response): Promise<void> {
    await pipeAgentUIStreamToResponse({
      response: res,
      agent: nachUIAgent,
      uiMessages: messages,
    });
  }
}
