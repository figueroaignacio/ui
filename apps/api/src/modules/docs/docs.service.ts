import { Injectable } from '@nestjs/common';
import type { Doc } from './docs.types';

interface DocsApiResponse {
  success: boolean;
  docs: Doc[];
}

@Injectable()
export class DocsService {
  private readonly baseUrl = process.env.FRONTEND_URL;

  async getDocs(): Promise<Doc[]> {
    try {
      const res = await fetch(`${this.baseUrl}/api/docs`);

      if (!res.ok) {
        throw new Error('Failed to fetch docs');
      }

      const data = (await res.json()) as DocsApiResponse;

      if (!data.success) {
        throw new Error('Docs API returned error');
      }

      return data.docs;
    } catch (error) {
      console.error('[DocsService] error:', error);
      throw new Error('Could not fetch docs');
    }
  }
}
