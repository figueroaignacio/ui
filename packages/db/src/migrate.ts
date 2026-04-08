import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { client, db } from './index';

async function main() {
  console.log('⏳ Applying migrations...');

  await migrate(db, { migrationsFolder: './migrations' });

  console.log('✅ Migrations applied successfully');

  await client.end();
}

main().catch((err) => {
  console.error('❌ Error applying migrations:', err);
  process.exit(1);
});
