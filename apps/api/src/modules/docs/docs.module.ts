import { Module } from '@nestjs/common';
import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';

@Module({
  providers: [DocsService],
  controllers: [DocsController],
})
export class DocsModule {}
