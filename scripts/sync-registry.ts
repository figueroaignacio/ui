// scripts/sync-registry.ts
import fs from 'node:fs';
import path from 'node:path';
// Importamos lo que ya tenés en tu paquete de base de datos
import { components, db } from '@repo/db';

const UI_COMPONENTS_ROOT = path.resolve(process.cwd(), 'packages/ui/src/components');

function extractDependencies(code: string): string[] {
  const dependencies: string[] = [];
  const importRegex = /from\s+['"]([^'"]+)['"]/g;
  let match;
  while ((match = importRegex.exec(code)) !== null) {
    const dep = match[1];
    if (!dep.startsWith('.') && !dep.startsWith('@repo/')) {
      dependencies.push(dep);
    }
  }
  return [...new Set(dependencies)];
}

async function syncRegistry() {
  console.log('🚀 Iniciando sincronización con el Schema de @repo/db...');

  const items = fs.readdirSync(UI_COMPONENTS_ROOT);

  for (const item of items) {
    const itemPath = path.join(UI_COMPONENTS_ROOT, item);
    const stats = fs.statSync(itemPath);

    let code = '',
      slug = '',
      name = '';

    if (stats.isDirectory()) {
      const files = fs.readdirSync(itemPath);
      const componentFile = files.find((f) => f.endsWith('.tsx') && !f.includes('.test.'));
      if (!componentFile) continue;
      code = fs.readFileSync(path.join(itemPath, componentFile), 'utf8');
      name = item;
      slug = item.toLowerCase();
    } else if (item.endsWith('.tsx') && !item.includes('.test.')) {
      code = fs.readFileSync(itemPath, 'utf8');
      name = item.replace('.tsx', '');
      slug = name.toLowerCase();
    } else continue;

    const deps = extractDependencies(code);
    console.log(`📦 Sincronizando: ${name}`);

    try {
      await db
        .insert(components)
        .values({
          name,
          slug,
          code,
          type: 'ui',
          dependencies: deps, // Ahora que la agregaste al schema, esto NO va a fallar
          registryDependencies: [],
        })
        .onConflictDoUpdate({
          target: components.slug,
          set: { code, dependencies: deps, updatedAt: new Date() },
        });

      console.log(`✅ ${name} listo.`);
    } catch (error) {
      console.error(`❌ Error en ${name}:`, error);
    }
  }
  process.exit(0);
}

syncRegistry();
