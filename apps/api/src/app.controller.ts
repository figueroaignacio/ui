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
