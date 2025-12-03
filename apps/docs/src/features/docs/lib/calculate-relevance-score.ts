import { SearchResultItem } from '@/lib/definitions';

export function calculateRelevanceScore(item: SearchResultItem, query: string): number {
  const lowerTitle = item.title.toLowerCase();
  const lowerHref = item.href.toLowerCase();

  if (lowerTitle === query) return 1000;
  if (lowerHref === query) return 900;

  if (lowerTitle.startsWith(query)) return 800;
  if (lowerHref.startsWith(query)) return 700;

  if (lowerTitle.includes(query)) return 600;
  if (lowerHref.includes(query)) return 500;

  return 0;
}
