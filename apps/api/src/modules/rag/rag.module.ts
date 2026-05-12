import { Module } from '@nestjs/common';
import { RagController } from './rag.controller';
import { RagRepository } from './rag.repository';
import { RagService } from './rag.service';

@Module({
  controllers: [RagController],
  providers: [RagService, RagRepository],
  exports: [RagService, RagRepository],
})
export class RagModule {}
