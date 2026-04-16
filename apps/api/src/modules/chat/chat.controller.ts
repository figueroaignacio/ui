import { Body, Controller, Post, Res } from '@nestjs/common';
import type { Response } from 'express';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() createChatDto: CreateChatDto, @Res() res: Response) {
    await this.chatService.streamChat(createChatDto.messages ?? [], res);
  }
}
