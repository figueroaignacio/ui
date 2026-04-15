import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import 'dotenv/config';
import { AppGuard } from './app.guard';
import { AppModule } from './app.module';
import { CONFIG } from './lib/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const reflector = app.get(Reflector);
  app.set('trust proxy', 'loopback');

  app.useGlobalGuards(new AppGuard(reflector));

  app.enableCors({
    origin: [CONFIG.url.frontend, CONFIG.url.portfolio, 'http://localhost:3000'] as string[],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  });

  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT || 3001);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
