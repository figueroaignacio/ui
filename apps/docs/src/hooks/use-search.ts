// Components
import { useCallback, useMemo, useState } from 'react';

// Utils
import { flattenNavigationItems, searchItems } from '@/lib/utils';
import { useTranslations } from 'next-intl';

// Definitions
import type { NavigationSection } from '@/lib/definitions';

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
