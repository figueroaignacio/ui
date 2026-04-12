import { Controller, Get, Param } from '@nestjs/common';
import { RegistryService } from './registry.service';

@Controller('registry')
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}

  @Get()
  async list() {
    return await this.registryService.getAllComponents();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return await this.registryService.getComponentBySlug(slug);
  }
}
