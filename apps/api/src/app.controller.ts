import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getWelcomeMessage();
  }

  @Get('health')
  checkSystem() {
    return this.appService.getHealthCheck();
  }

  @Get('blame')
  gitBlame() {
    return {
      error: '404 - Skill Not Found',
      message: 'The component is fine. Your implementation is the bottleneck.',
      suggestion: 'Try reading the documentation or go back to jQuery.',
    };
  }

  @Get('inspiration')
  getQuote() {
    return {
      author: 'Nacho Figueroa',
      quote: this.appService.getSecretQuote(),
    };
  }
}
