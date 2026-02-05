import type { NavigationSection } from '@/lib/definitions';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { flattenNavigationItems } from '../lib/flatten-navigation-items';
import { searchItems } from '../lib/search-items';

export function useSearch() {
  const [query, setQuery] = useState('');
  const t = useTranslations('docs');
  const navigation = t.raw('navigation') as NavigationSection[];

  const allItems = useMemo(() => flattenNavigationItems(navigation), [navigation]);

  const results = useMemo(() => searchItems(allItems, query), [allItems, query]);

  const clearQuery = useCallback(() => setQuery(''), []);

  return {
    query,
    setQuery,
    clearQuery,
    results,
    navigation,
  };
}
