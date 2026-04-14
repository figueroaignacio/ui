import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body('messages') messages: unknown[], @Res() res: Response) {
    await this.chatService.streamChat(messages ?? [], res);
  }
}
