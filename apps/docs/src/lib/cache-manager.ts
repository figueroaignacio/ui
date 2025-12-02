import type { ComponentContext, DocumentationContext } from './context-loader';

interface CachedContext {
  components: ComponentContext[];
  docsEn: DocumentationContext[];
  docsEs: DocumentationContext[];
  lastUpdated: number;
}

const CACHE_DURATION = 1000 * 60 * 30;
let cache: CachedContext | null = null;

export async function getCachedContext(): Promise<CachedContext> {
  const now = Date.now();

  if (cache && now - cache.lastUpdated < CACHE_DURATION) {
    console.log('✅ Using cached context');
    return cache;
  }

  console.log('🔄 Regenerating context cache...');

  const { loadComponents, loadDocumentation } = await import('./context-loader');

  const [components, docsEn, docsEs] = await Promise.all([
    loadComponents(),
    loadDocumentation('en'),
    loadDocumentation('es'),
  ]);

  cache = {
    components,
    docsEn,
    docsEs,
    lastUpdated: now,
  };

  console.log(
    `📦 Cached: ${components.length} components, ${docsEn.length} EN docs, ${docsEs.length} ES docs`,
  );

  return cache;
}

export function invalidateCache(): void {
  cache = null;
  console.log('🗑️  Cache invalidated');
}
