import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { RegistryRepository } from './registry.repository';

@Controller('registry')
export class RegistryController {
  constructor(private readonly registryRepository: RegistryRepository) {}

  @Get()
  async list() {
    return await this.registryRepository.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const component = await this.registryRepository.findBySlug(slug);

    if (!component) {
      throw new NotFoundException(`NachUI: El componente '${slug}' no existe.`);
    }

    return component;
  }
}
