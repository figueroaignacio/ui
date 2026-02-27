import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

type NavItem = {
  title: string;
  href: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

export function useDocsNavigation(currentPath: string) {
  const t = useTranslations('docs');
  const docsNavigation = t.raw('navigation') as NavSection[];

  // useMemo — allItems is rebuilt from the full navigation on every render without this
  // (rerender-memo rule: extract expensive work into memoized computation)
  const { prev, next } = useMemo(() => {
    const allItems = docsNavigation.flatMap((section) => section.items);
    const currentIndex = allItems.findIndex((item) => item.href === currentPath);

    if (currentIndex === -1) return { prev: null, next: null };

    return {
      prev: currentIndex > 0 ? allItems[currentIndex - 1] : null,
      next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null,
    };
  }, [docsNavigation, currentPath]);

  return { prev, next };
}
