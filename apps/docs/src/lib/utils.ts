import type { NavigationSection, SearchResultItem } from '@/lib/definitions';
import { docs as rawDocs } from '@/velite-content';
import { Locale } from 'next-intl';

export const docs = Array.isArray(rawDocs) ? rawDocs : [];

export function getDocBySlug(slug: string, locale: Locale) {
  return docs.find((doc) => doc.slugAsParams === slug && doc.locale === locale);
}

export function flattenNavigationItems(sections: NavigationSection[]): SearchResultItem[] {
  return sections.flatMap((section) =>
    section.items.map((item) => ({
      title: item.title,
      href: item.href,
      category: section.title,
    })),
  );
}

function calculateRelevanceScore(item: SearchResultItem, query: string): number {
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
