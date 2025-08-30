'use client';

import * as React from 'react';

// Hooks
import { useMounted } from '@/hooks/use-mounted';
import { useTranslations } from 'next-intl';

// Utils
import { cn } from '@/lib/utils';

interface TocEntry {
  items?: TocEntry[];
  url: string;
  title: string;
}

interface TocProps {
  toc: TocEntry[];
}

export function Toc({ toc }: TocProps) {
  const t = useTranslations('components');

  const itemIds = React.useMemo(
    () =>
      toc
        ? toc
            .flatMap((item) => [item.url, item?.items?.map((item) => item.url)])
            .flat()
            .filter(Boolean)
            .map((id) => id?.split('#')[1])
        : [],
    [toc],
  );
  const activeHeading = useActiveItem(itemIds);
  const mounted = useMounted();

  if (!toc || toc.length === 0) {
    return null;
  }

  return mounted ? (
    <div className="hide-scrollbar sticky top-20 h-[calc(100vh-5rem)] space-y-2">
      <p className="text-muted-foreground text-sm font-medium">{t('toc.desktop.label')}</p>
      <Tree tree={toc} activeItem={activeHeading} />
    </div>
  ) : null;
}

function useActiveItem(itemIds: (string | undefined)[]) {
  const [activeId, setActiveId] = React.useState<string>('');

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: `0% 0% -60% 0%` },
    );

    itemIds?.forEach((id) => {
      if (!id) {
        return;
      }

      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      itemIds?.forEach((id) => {
        if (!id) {
          return;
        }

        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [itemIds]);

  return activeId;
}

interface TreeProps {
  tree: TocEntry[];
  level?: number;
  activeItem?: string | null;
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
  return tree.length && level < 3 ? (
    <ul className={cn('m-0 list-none text-sm', { 'pl-4': level !== 1 })}>
      {tree.map((item, index) => {
        return (
          <li key={index} className={cn('mt-0 pt-2')}>
            <a
              href={item.url}
              className={cn(
                'hover:text-foreground animate-show-soft inline-block py-0.5 text-xs no-underline transition-all duration-150 hover:underline',
                item.url === `#${activeItem}`
                  ? 'text-foreground font-medium underline'
                  : 'text-muted-foreground',
              )}
            >
              {item.title}
            </a>
            {item.items?.length ? (
              <Tree tree={item.items} level={level + 1} activeItem={activeItem} />
            ) : null}
          </li>
        );
      })}
    </ul>
  ) : null;
}
