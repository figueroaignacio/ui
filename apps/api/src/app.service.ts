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
      endpoints: [
        '/api/v1',
        '/api/v1/health',
        '/api/v1/inspiration',
        '/api/v1/blame',
        '/api/v1/registry',
        '/api/v1/registry/:slug',
        '/api/v1/themes',
        '/api/v1/docs',
      ],
      status: 'RUNNING (Unlike your last deploy)',
      uptime: this.formatUptime(process.uptime()),
      license: "Just don't say you built it yourself.",
    };
  }

  getHealthCheck() {
    return {
      status: 'stable',
      engine: 'NestJS + Drizzle',
      database: 'Connected (and judging you)',
      message: 'The registry is alive. Your CSS, however, is a disaster.',
      timestamp: new Date().toISOString(),
      system: {
        memory: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`,
        node: process.version,
        platform: process.platform,
      },
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

  getBlameResponse() {
    return {
      error: '404 - Skill Not Found',
      message: 'The component is fine. Your implementation is the bottleneck.',
      suggestion: 'Try reading the documentation or go back to jQuery.',
    };
  }

  private formatUptime(seconds: number): string {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const parts: string[] = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    if (s > 0) parts.push(`${s}s`);

    return parts.join(' ') || '0s';
  }
}
