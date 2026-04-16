import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];
    const expectedKey = this.configService.get<string>('NACHUI_API_KEY');

    if (!apiKey || apiKey !== expectedKey) {
      throw new UnauthorizedException('Invalid or missing API Key');
    }

    return true;
  }
}
