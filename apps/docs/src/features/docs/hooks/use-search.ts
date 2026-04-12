import type { NavigationSection } from '@/lib/definitions';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';
import { flattenNavigationItems } from '../lib/flatten-navigation-items';
import { searchItems } from '../lib/search-items';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const t = useTranslations('docs');
  const navigation = t.raw('navigation') as NavigationSection[];

  const allItems = useMemo(() => flattenNavigationItems(navigation), [navigation]);

  const results = useMemo(() => searchItems(allItems, query), [allItems, query]);

  const activeItems = query ? results : allItems;

  const nextItem = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % activeItems.length);
  }, [activeItems.length]);

  const previousItem = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + activeItems.length) % activeItems.length);
  }, [activeItems.length]);

  const setQueryWithReset = useCallback((q: string) => {
    setQuery(q);
    setSelectedIndex(0);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
    setSelectedIndex(0);
  }, []);

  return {
    query,
    setQuery: setQueryWithReset,
    clearQuery,
    results,
    navigation,
    selectedIndex,
    setSelectedIndex,
    nextItem,
    previousItem,
    activeItems,
  };
}
