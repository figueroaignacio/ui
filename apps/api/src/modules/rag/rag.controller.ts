import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SearchRagDto } from './dto/search-rag.dto';
import { RagService } from './rag.service';

@Controller('rag')
export class RagController {
  constructor(private readonly ragService: RagService) {}

  @Post('search')
  @HttpCode(HttpStatus.OK)
  async search(@Body() dto: SearchRagDto) {
    const results = await this.ragService.search(dto.query, dto.locale ?? 'en', dto.topK ?? 5);

    return {
      found: results.length > 0,
      results,
    };
  }
}
