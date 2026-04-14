import { Controller, Get } from '@nestjs/common';
import { DocsService } from './docs.service';
import type { Doc } from './docs.types';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Get()
  async getDocs(): Promise<{ success: true; data: Doc[] }> {
    const docs = await this.docsService.getDocs();

    return {
      success: true,
      data: docs,
    };
  }
}
