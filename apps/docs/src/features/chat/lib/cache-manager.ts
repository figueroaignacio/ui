import type { ComponentContext, DocumentationContext } from './context-loader';

interface CachedContext {
  components: ComponentContext[];
  docs: DocumentationContext[];
  lastUpdated: number;
}

const CACHE_DURATION = 1000 * 60 * 30;
let cache: CachedContext | null = null;

export async function getCachedContext(): Promise<CachedContext> {
  const now = Date.now();

  if (cache && now - cache.lastUpdated < CACHE_DURATION) {
    return cache;
  }

  const { loadComponents, loadDocumentation } = await import('./context-loader');

  const [components, docs] = await Promise.all([loadComponents(), loadDocumentation()]);

  cache = {
    components,
    docs,
    lastUpdated: now,
  };

  return cache;
}

export function invalidateCache(): void {
  cache = null;
}
