import { Controller, Get, Res } from '@nestjs/common';
import express from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Res() res: express.Response) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(this.appService.getWelcomeMessage());
  }

  @Get('health')
  checkSystem() {
    return this.appService.getHealthCheck();
  }

  @Get('blame')
  gitBlame() {
    return this.appService.getBlameResponse();
  }

  @Get('inspiration')
  getQuote(): { author: string; quote: string } {
    return {
      author: 'Nacho Figueroa',
      quote: this.appService.getSecretQuote(),
    };
  }
}
