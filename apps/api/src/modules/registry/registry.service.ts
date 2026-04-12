import { Injectable, NotFoundException } from '@nestjs/common';
import { RegistryRepository } from './registry.repository';

@Injectable()
export class RegistryService {
  constructor(private readonly repository: RegistryRepository) {}

  async getAllComponents() {
    return await this.repository.findAll();
  }

  async getComponentBySlug(slug: string) {
    const component = await this.repository.findBySlug(slug);

    if (!component) {
      throw new NotFoundException(`NachoUI: El componente '${slug}' no existe.`);
    }

    return component;
  }
}
