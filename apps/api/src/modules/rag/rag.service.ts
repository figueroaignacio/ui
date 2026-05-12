import { Injectable, Logger } from '@nestjs/common';
import { embedQuery } from '@repo/ai';
import { DocChunkSearchResult, RagRepository } from './rag.repository';

@Injectable()
export class RagService {
  private readonly logger = new Logger(RagService.name);

  constructor(private readonly ragRepository: RagRepository) {}

  async search(query: string, locale: 'en' | 'es', topK: number): Promise<DocChunkSearchResult[]> {
    this.logger.log(`Searching: "${query}" (locale=${locale}, topK=${topK})`);

    const queryEmbedding = await embedQuery(query);
    const results = await this.ragRepository.searchByEmbedding(queryEmbedding, locale, topK);

    this.logger.log(`Found ${results.length} results`);
    return results;
  }
}
