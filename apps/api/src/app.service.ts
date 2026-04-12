import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getWelcomeMessage() {
    return {
      title: 'NACHUI REGISTRY API',
      version: '1.0.0',
      tagline: 'The kernel of your Frontend',
      quote: 'If you think your UI is good, you are probably wrong. Like me',
      message:
        "Welcome to the source of truth. NachUI is NOT a library for weak developers who love 1GB of node_modules. It's for people who know how to copy-paste code and OWN IT.",
      rules: [
        "don't ask for a 'Calendar' component if you can't even center a div without ai.",
        "if the CLI fails, it's probably your shitty internet or your OS.",
        "talk is cheap. Show me the code (or run 'pnpm dlx nachui list').",
      ],
      status: 'RUNNING (Unlike your last deploy)',
      uptime: `${Math.floor(process.uptime())}s`,
      license: "Just don't say you built it yourself.",
    };
  }

  getHealthCheck() {
    return {
      status: 'stable',
      engine: 'NestJS + Drizzle',
      database: 'Connected (and judging you)',
      message: 'The registry is alive. Your CSS, however, is a disaster.',
    };
  }

  getSecretQuote(): string {
    const quotes = [
      "Software is like sex: it's better when it's free and has good padding.",
      'Most decorators are just a way to hide bad architecture. Use NachUI instead.',
      "Real developers don't need 'npm install'. They need a CLI and a dream.",
      "If it compiles, it's good. If it has NachUI, it's perfect.",
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
}
