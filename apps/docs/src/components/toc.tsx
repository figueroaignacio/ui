'use client';

import * as React from 'react';

// Hooks
import { useMounted } from '@/hooks/use-mounted';

// Utils
import { cn } from '@repo/ui/lib/cn';

interface TocEntry {
  items?: TocEntry[];
  url: string;
  title: string;
}

interface TocProps {
  toc: TocEntry[];
}

export function Toc({ toc }: TocProps) {
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

  if (!mounted) {
    return (
      <div className="sticky top-24 h-[calc(100vh-5rem)] space-y-3">
        <p className="text-xs font-semibold tracking-wider">on this page</p>
        <div className="bg-secondary h-3 w-24 animate-pulse rounded" />
        <div className="border-border/40 space-y-3 border-l pl-4">
          <div className="bg-secondary h-3 w-32 animate-pulse rounded" />
          <div className="space-y-2.5 pl-3">
            <div className="bg-secondary h-3 w-28 animate-pulse rounded" />
            <div className="bg-secondary h-3 w-24 animate-pulse rounded" />
          </div>
          <div className="bg-secondary h-3 w-36 animate-pulse rounded" />
          <div className="space-y-2.5 pl-3">
            <div className="bg-secondary h-3 w-28 animate-pulse rounded" />
          </div>
          <div className="bg-secondary h-3 w-28 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="hide-scrollbar sticky top-24 h-[calc(100vh-5rem)] space-y-3">
      <p className="text-xs font-semibold tracking-wider">on this page</p>
      <div className="border-border/40 border-l pl-4">
        <Tree tree={toc} activeItem={activeHeading} />
      </div>
    </div>
  );
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
    <ul
      className={cn('m-0 list-none space-y-1.5 text-sm', {
        'pl-3': level !== 1,
      })}
    >
      {tree.map((item, index) => {
        const isActive = item.url === `#${activeItem}`;

        return (
          <li key={index} className="relative">
            <a
              href={item.url}
              className={cn(
                'group relative inline-block py-1 text-xs leading-relaxed no-underline transition-all duration-200',
                isActive
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {isActive && (
                <span className="bg-primary absolute top-1/2 -left-4.5 h-4 w-0.5 -translate-y-1/2 rounded-full transition-all" />
              )}
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
