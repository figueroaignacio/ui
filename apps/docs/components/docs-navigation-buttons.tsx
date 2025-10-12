'use client';

import { Link } from '@/i18n/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { useTranslations } from 'next-intl';

type NavItem = {
  title: string;
  href: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

type DocsNavigationButtonsProps = {
  currentPath: string;
};

function getAllItems(navigation: NavSection[]): NavItem[] {
  return navigation.flatMap((section) => section.items);
}

function findAdjacentPages(currentPath: string, navigation: NavSection[]) {
  const allItems = getAllItems(navigation);
  const currentIndex = allItems.findIndex((item) => item.href === currentPath);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? allItems[currentIndex - 1] : null,
    next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null,
  };
}

export function DocsNavigationButtons({ currentPath }: DocsNavigationButtonsProps) {
  const t = useTranslations('ui');
  const docsNavigation = t.raw('docsNavigation') as NavSection[];

  const { prev, next } = findAdjacentPages(currentPath, docsNavigation);

  return (
    <div className="flex items-center gap-1">
      {prev ? (
        <Link
          href={prev.href}
          className="border-border hover:bg-accent flex h-9 w-9 items-center justify-center rounded-md border transition-colors"
          aria-label={`Previous: ${prev.title}`}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Link>
      ) : (
        <button
          disabled
          className="border-border flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-md border opacity-50"
          aria-label="No previous page"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
      )}

      {next ? (
        <Link
          href={next.href}
          className="border-border hover:bg-accent flex h-9 w-9 items-center justify-center rounded-md border transition-colors"
          aria-label={`Next: ${next.title}`}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Link>
      ) : (
        <button
          disabled
          className="border-border flex h-9 w-9 cursor-not-allowed items-center justify-center rounded-md border opacity-50"
          aria-label="No next page"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
