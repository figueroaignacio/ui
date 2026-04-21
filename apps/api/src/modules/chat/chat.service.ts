import { Injectable, Logger } from '@nestjs/common';
import { nachUIAgent } from '@repo/ai';
import { pipeAgentUIStreamToResponse } from 'ai';
import type { Response } from 'express';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  async streamChat(messages: unknown[], res: Response): Promise<void> {
    await pipeAgentUIStreamToResponse({
      response: res,
      agent: nachUIAgent,
      uiMessages: messages,
      onError: (err: unknown) => {
        const error = (err as Record<string, unknown>) || {};
        const message = typeof error.message === 'string' ? error.message : 'Unknown Error';

        this.logger.error(`Message: ${message}`);

        if (typeof error.statusCode === 'number') {
          this.logger.error(`Status Code: ${error.statusCode}`);
        }

        if (typeof error.responseBody === 'string') {
          try {
            const parsed = JSON.parse(error.responseBody) as Record<string, unknown>;
            this.logger.error(`Detalles: ${JSON.stringify(parsed, null, 2)}`);
          } catch {
            this.logger.error(`Response Body: ${error.responseBody}`);
          }
        } else if (error.data) {
          this.logger.error(`Data: ${JSON.stringify(error.data, null, 2)}`);
        }

        try {
          if (typeof error.responseBody === 'string') {
            const parsed = JSON.parse(error.responseBody) as { error?: { message?: string } };
            return `Uh, lpm hubo un error loco: ${parsed.error?.message || 'Límite alcanzado.'}`;
          }
          return 'Error en la petición a Gemini. Intenta de nuevo más tarde.';
        } catch {
          return 'Error en la petición a Gemini. Intenta de nuevo más tarde.';
        }
      },
    });
  }
}
