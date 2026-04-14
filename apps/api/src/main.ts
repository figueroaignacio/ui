import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import 'dotenv/config';
import type { Request, Response } from 'express';
import express from 'express';
import { AppModule } from './app.module';
import { CONFIG } from './lib/config';

const server = express();

async function createNestApp() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: CONFIG.frontend.url || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api/v1');

  await app.init();
  return app;
}

let isReady = false;
const appPromise = createNestApp().then((app) => {
  isReady = true;
  return app;
});

export default async function handler(req: Request, res: Response) {
  if (!isReady) {
    await appPromise;
  }
  server(req, res);
}

if (process.env.NODE_ENV !== 'production' || process.env.PORT) {
  appPromise
    .then(() => {
      const port = process.env.PORT || 3001;
      server.listen(port, () => {
        console.log(`[Local Development] Application running on http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.error('Failed to start application:', err);
      process.exit(1);
    });
}
