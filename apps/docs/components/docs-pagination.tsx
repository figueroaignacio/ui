// components/docs-pagination.tsx
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

type DocsPaginationProps = {
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

export function DocsPagination({ currentPath }: DocsPaginationProps) {
  const t = useTranslations();
  const docsNavigation = t.raw('ui.docsNavigation') as NavSection[];

  const { prev, next } = findAdjacentPages(currentPath, docsNavigation);

  if (!prev && !next) {
    return null;
  }

  return (
    <div className="mt-12 flex items-center justify-between gap-4 pt-8">
      {prev ? (
        <Link
          href={prev.href}
          className="border-border hover:bg-accent  group flex flex-1 flex-col gap-2 rounded-lg border p-4 transition-colors"
        >
          <span className="text-muted-foreground flex items-center gap-2 text-sm">
            <ChevronLeftIcon className="h-4 w-4" />
            {t('components.docsPagination.previous')}
          </span>
          <span className="font-medium group-hover:underline">{prev.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={next.href}
          className="border-border hover:bg-accent  group flex flex-1 flex-col gap-2 rounded-lg border p-4 text-right transition-colors"
        >
          <span className="text-muted-foreground flex items-center justify-end gap-2 text-sm">
            {t('components.docsPagination.next')}
            <ChevronRightIcon className="h-4 w-4" />
          </span>
          <span className="font-medium group-hover:underline">{next.title}</span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
