import { SearchResultItem } from '@/lib/definitions';
import { calculateRelevanceScore } from './calculate-relevance-score';

export function searchItems(items: SearchResultItem[], query: string): SearchResultItem[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();

  return items
    .map((item) => ({
      item,
      score: calculateRelevanceScore(item, lowerQuery),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}
