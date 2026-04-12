import { Injectable } from '@nestjs/common';
import { Component, components, db, eq, NewComponent } from '@repo/db';

@Injectable()
export class RegistryRepository {
  async findAll() {
    return await db
      .select({
        name: components.name,
        slug: components.slug,
        type: components.type,
        dependencies: components.dependencies,
      })
      .from(components);
  }

  async findBySlug(slug: string): Promise<Component | undefined> {
    const [result] = await db
      .select()
      .from(components)
      .where(eq(components.slug, slug.toLowerCase()));
    return result;
  }

  async upsert(data: NewComponent) {
    return await db
      .insert(components)
      .values(data)
      .onConflictDoUpdate({
        target: components.slug,
        set: { ...data, updatedAt: new Date() },
      });
  }
}
