import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Doc } from './docs.types';

interface DocsApiResponse {
  success: boolean;
  docs: Doc[];
}

@Injectable()
export class DocsService {
  private readonly logger = new Logger(DocsService.name);
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('FRONTEND_URL') || '';
  }

  async getDocs(): Promise<Doc[]> {
    try {
      const url = `${this.baseUrl}/api/docs`;
      this.logger.log(`Fetching docs from: ${url}`);
      const res = await fetch(url);

      if (!res.ok) {
        throw new BadGatewayException('Failed to fetch docs');
      }

      const data = (await res.json()) as DocsApiResponse;

      if (!data.success) {
        throw new BadGatewayException('Docs API returned error');
      }

      return data.docs;
    } catch (error) {
      if (error instanceof BadGatewayException) {
        throw error;
      }
      this.logger.error('error:', error);
      throw new InternalServerErrorException('Could not fetch docs');
    }
  }
}
