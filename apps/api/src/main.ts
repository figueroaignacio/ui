import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { AppGuard } from './app.guard';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableShutdownHooks();

  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);

  app.set('trust proxy', 'loopback');

  app.useGlobalGuards(new AppGuard(reflector, configService));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  const frontendUrl = configService.get<string>('FRONTEND_URL');
  const portfolioUrl = configService.get<string>('PORTFOLIO_URL');

  app.enableCors({
    origin: [frontendUrl, portfolioUrl, 'http://localhost:3000'].filter(Boolean) as string[],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  });

  app.setGlobalPrefix('api/v1');

  const port = configService.get<number>('PORT') || 3001;
  await app.listen(port);

  Logger.log(`Application is running on port ${port}`, 'Bootstrap');
}

bootstrap().catch((err) => {
  Logger.error('Failed to start application:', err, 'Bootstrap');
  process.exit(1);
});
