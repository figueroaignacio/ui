import { Module } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { RegistryController } from './registry.controller';

@Module({
  controllers: [RegistryController],
  providers: [RegistryService],
})
export class RegistryModule {}
