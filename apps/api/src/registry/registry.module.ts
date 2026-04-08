import { Module } from '@nestjs/common';
import { RegistryController } from './registry.controller';
import { RegistryRepository } from './registry.repository';
import { RegistryService } from './registry.service';

@Module({
  controllers: [RegistryController],
  providers: [RegistryService, RegistryRepository],
  exports: [RegistryService],
})
export class RegistryModule {}
