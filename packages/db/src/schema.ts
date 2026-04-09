import { jsonb, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const components = pgTable('components', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  code: text('code').notNull(),
  dependencies: jsonb('dependencies').$type<string[]>().default([]),
  registryDependencies: jsonb('registry_dependencies').$type<string[]>().default([]),
  type: text('type').$type<'ui' | 'hook' | 'utils'>().default('ui'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type Component = typeof components.$inferSelect;
export type NewComponent = typeof components.$inferInsert;
