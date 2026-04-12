import { Link } from '@/i18n/navigation';
import type { NavigationSection, SearchResultItem } from '@/lib/definitions';
import { Dialog } from '@repo/ui/components/dialog';
import { cn } from '@repo/ui/lib/cn';
import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';

interface SearchResultsProps {
  query: string;
  results: SearchResultItem[];
  navigation: NavigationSection[];
  selectedIndex: number;
}

export function SearchResults({ query, results, navigation, selectedIndex }: SearchResultsProps) {
  const t = useTranslations('components.searcher');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeElement = containerRef.current?.querySelector('[data-active="true"]');
    if (activeElement) {
      activeElement.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (query && results.length === 0) {
    return <div className="text-muted-foreground py-8 text-center">{t('noResults')}</div>;
  }

  if (results.length > 0) {
    return (
      <div ref={containerRef} className="max-h-[300px] overflow-y-auto p-2">
        <div className="mb-2">
          <h2 className="text-muted-foreground px-2 py-1.5 text-xs font-medium">Results</h2>
          <ul className="space-y-0.5">
            {results.map((item, index) => {
              const isActive = index === selectedIndex;
              return (
                <li key={item.href}>
                  <Dialog.Close className="h-full w-full text-left outline-none">
                    <Link
                      href={item.href}
                      data-active={isActive}
                      className={cn(
                        'text-foreground flex w-full cursor-pointer items-center justify-between gap-x-2 rounded-md px-4 py-2.5 text-sm transition-colors',
                        isActive ? 'bg-secondary/80' : 'hover:bg-secondary/50',
                      )}
                    >
                      <span className={cn(isActive && 'font-medium')}>{item.title}</span>
                      <span className="text-muted-foreground text-xs">{item.category}</span>
                    </Link>
                  </Dialog.Close>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  let globalIndex = 0;

  return (
    <div ref={containerRef} className="max-h-[300px] overflow-y-auto p-2">
      {navigation.map((section) => (
        <div key={section.title} className="mb-4 last:mb-0">
          <h2 className="text-muted-foreground px-2 py-1.5 text-xs font-medium">{section.title}</h2>
          <ul className="space-y-0.5">
            {section.items.map((item) => {
              const isActive = globalIndex === selectedIndex;
              globalIndex++;

              return (
                <li key={item.href}>
                  <Dialog.Close className="h-full w-full text-left outline-none">
                    <Link
                      href={item.href}
                      data-active={isActive}
                      className={cn(
                        'text-foreground flex w-full cursor-pointer items-center gap-x-2 rounded-md px-4 py-2.5 text-sm transition-colors',
                        isActive ? 'bg-secondary/80' : 'hover:bg-secondary/50',
                      )}
                    >
                      <span className={cn(isActive && 'font-medium')}>{item.title}</span>
                    </Link>
                  </Dialog.Close>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
