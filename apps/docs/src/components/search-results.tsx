// Hooks
import { useTranslations } from 'next-intl';

// Components
import { Link } from '@/i18n/navigation';
import { CodeIcon, FileIcon, RocketIcon } from '@radix-ui/react-icons';
import { DialogClose } from '@repo/ui/components/dialog';

// Definitions
import type { NavigationSection, SearchResultItem } from '@/lib/definitions';

const CATEGORY_ICONS: Record<string, typeof RocketIcon> = {
  'getting started': RocketIcon,
  comenzando: RocketIcon,
  components: CodeIcon,
  componentes: CodeIcon,
};

function getCategoryIcon(category: string) {
  const Icon = CATEGORY_ICONS[category.toLowerCase()] ?? FileIcon;
  return <Icon className="h-4 w-4" />;
}

interface SearchResultsProps {
  query: string;
  results: SearchResultItem[];
  navigation: NavigationSection[];
}

export function SearchResults({ query, results, navigation }: SearchResultsProps) {
  const t = useTranslations('components.searcher');

  // No results state
  if (query && results.length === 0) {
    return <div className="text-muted-foreground py-8 text-center">{t('noResults')}</div>;
  }

  // Search results
  if (results.length > 0) {
    return (
      <div className="my-4 max-h-64 overflow-hidden">
        <ul className="max-h-96 space-y-1 overflow-y-auto pr-2">
          {results.map((item) => (
            <li
              key={item.href}
              className="hover:bg-primary text-foreground ring-primary ring-offset-background rounded-sm px-3 py-2 text-sm transition-transform duration-200 active:scale-95"
            >
              <DialogClose className="h-full w-full">
                <Link href={item.href} className="flex items-center gap-x-4">
                  {getCategoryIcon(item.category)}
                  <div className="flex w-full items-center justify-between">
                    <span className="text-sm">{item.title}</span>
                    <span className="text-muted-foreground text-xs">{item.category}</span>
                  </div>
                </Link>
              </DialogClose>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Default navigation view
  return (
    <div className="max-h-64 overflow-hidden">
      <div className="max-h-64 overflow-y-auto pr-2">
        {navigation.map((section) => (
          <div key={section.title}>
            <h2 className="text-muted-foreground my-4 text-xs">{section.title}</h2>
            <ul className="space-y-3">
              {section.items.map((item) => (
                <li
                  key={item.href}
                  className="hover:bg-accent text-foreground ring-primary ring-offset-background rounded-xl px-3 py-2 text-sm transition-transform duration-200 active:scale-95"
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
  );
}
