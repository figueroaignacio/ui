'use client';

// Hooks
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

// Components
import { Link } from '@/i18n/navigation';
import {
  CodeIcon,
  Cross2Icon,
  FileIcon,
  MagnifyingGlassIcon,
  RocketIcon,
} from '@radix-ui/react-icons';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface SearchResultItem {
  title: string;
  href: string;
  category: string;
}

export function Searcher() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();
  const docsNavigation: {
    title: string;
    items: { title: string; href: string }[];
  }[] = t.raw('ui.docsNavigation');

  const getCategoryIcon = (category: string) => {
    const lowerCaseCategory = category.toLowerCase();

    switch (lowerCaseCategory) {
      case 'getting started':
      case 'comenzando':
        return <RocketIcon className="h-4 w-4" />;
      case 'components':
      case 'componentes':
        return <CodeIcon className="h-4 w-4" />;
      default:
        return <FileIcon className="h-4 w-4" />;
    }
  };

  const getFlattenedNavigationItems = () => {
    const flattenedItems: SearchResultItem[] = [];

    docsNavigation.forEach((section) => {
      section.items.forEach((item) => {
        flattenedItems.push({
          title: item.title,
          href: item.href,
          category: section.title,
        });
      });
    });

    return flattenedItems;
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const allItems = getFlattenedNavigationItems();

    const filtered = allItems.filter(
      (item) =>
        item.title.toLowerCase() === query ||
        item.href.toLowerCase() === query ||
        item.title.toLowerCase().includes(query) ||
        item.href.toLowerCase().includes(query),
    );

    filtered.sort((a, b) => {
      const aExactTitleMatch = a.title.toLowerCase() === query ? -1 : 0;
      const bExactTitleMatch = b.title.toLowerCase() === query ? -1 : 0;
      const aExactHrefMatch = a.href.toLowerCase() === query ? -1 : 0;
      const bExactHrefMatch = b.href.toLowerCase() === query ? -1 : 0;

      return aExactTitleMatch + aExactHrefMatch - (bExactTitleMatch + bExactHrefMatch);
    });

    setSearchResults(filtered);
  }, [searchQuery]);

  const handleDialogOpenChange = (open: boolean) => {
    if (open && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchQuery('');
    }
  };

  return (
    <Dialog onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="default" className="w-40 justify-start gap-6">
          <MagnifyingGlassIcon className="h-4 w-4" />
          <span className="font-light">{t('components.searcher.label')}...</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>I7A UI docs</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative">
            <MagnifyingGlassIcon className="text-muted-foreground absolute top-2.5 left-2 h-4 w-4" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Type a command or search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-xl border px-9 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            />
            {searchQuery && (
              <Cross2Icon
                className="text-muted-foreground hover:text-foreground absolute top-2.5 right-2 h-4 w-4 cursor-pointer"
                onClick={() => setSearchQuery('')}
              />
            )}
          </div>

          {searchResults.length > 0 ? (
            <div className="my-4 max-h-64 overflow-hidden">
              <ul className="max-h-96 space-y-1 overflow-y-auto pr-2">
                {searchResults.map((item) => (
                  <li
                    key={item.href}
                    className="hover:bg-primary text-foreground ring-primary ring-offset-background rounded-sm px-3 py-2 text-sm transition-transform duration-200 active:scale-95"
                  >
                    <DialogClose className="h-full w-full">
                      <Link href={item.href} className="flex items-center gap-x-4">
                        {getCategoryIcon(item.category)}
                        <div className="flex w-full items-center justify-between">
                          <div className="text-sm">{item.title}</div>
                          <div className="text-muted-foreground text-xs">{item.category}</div>
                        </div>
                      </Link>
                    </DialogClose>
                  </li>
                ))}
              </ul>
            </div>
          ) : searchQuery ? (
            <div className="text-muted-foreground py-8 text-center">No results found.</div>
          ) : (
            <div className="max-h-64 overflow-hidden">
              <div className="max-h-64 overflow-y-auto pr-2">
                {docsNavigation.map((section) => (
                  <div key={section.title}>
                    <h2 className="text-muted-foreground my-4 text-xs">{section.title}</h2>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li
                          key={item.href}
                          className="hover:bg-secondary text-foreground ring-primary ring-offset-background rounded-xl px-3 py-2 text-sm transition-transform duration-200 active:scale-95"
                        >
                          <DialogClose className="h-full w-full">
                            <Link href={item.href} className="flex items-center gap-x-4">
                              {getCategoryIcon(section.title)}
                              {item.title}
                            </Link>
                          </DialogClose>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
