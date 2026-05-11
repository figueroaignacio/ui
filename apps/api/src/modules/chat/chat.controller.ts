import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() createChatDto: CreateChatDto, @Res() res: Response, @Req() req: Request) {
    const abortController = new AbortController();
    req.on('close', () => abortController.abort());

    await this.chatService.streamChat(createChatDto.messages ?? [], res, abortController.signal);
  }
}
