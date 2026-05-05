import { Module } from '@nestjs/common';
import { RegistryController } from './registry.controller';
import { RegistryRepository } from './registry.repository';

@Module({
  controllers: [RegistryController],
  providers: [RegistryRepository],
  exports: [RegistryRepository],
})
export class RegistryModule {}
