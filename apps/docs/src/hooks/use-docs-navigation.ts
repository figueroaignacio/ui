import { useTranslations } from 'next-intl';

type NavItem = {
  title: string;
  href: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

export function useDocsNavigation(currentPath: string) {
  const t = useTranslations('ui');
  const docsNavigation = t.raw('docsNavigation') as NavSection[];

  const allItems = docsNavigation.flatMap((section) => section.items);
  const currentIndex = allItems.findIndex((item) => item.href === currentPath);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? allItems[currentIndex - 1] : null,
    next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null,
  };
}
