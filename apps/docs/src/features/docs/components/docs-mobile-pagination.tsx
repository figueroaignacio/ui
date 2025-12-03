'use client';

// Hooks
import { useDocsNavigation } from '@/features/docs/hooks/use-docs-navigation';

// Components
import { Link } from '@/i18n/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';

type MobileDocsPaginationProps = {
  currentPath: string;
};

export function MobileDocsPagination({ currentPath }: MobileDocsPaginationProps) {
  const { prev, next } = useDocsNavigation(currentPath);

  return (
    <div className="bg-background/95 supports-backdrop-filter:bg-background/60 fixed right-0 bottom-0 left-0 z-50 flex items-center justify-end gap-2 border-t p-4 backdrop-blur lg:hidden">
      {prev ? (
        <Link href={prev.href}>
          <Button variant="outline" size="icon" aria-label={`Previous: ${prev.title}`}>
            <ChevronLeftIcon className="h-5 w-5" />
          </Button>
        </Link>
      ) : (
        <Button disabled variant="outline" size="icon" aria-label="No previous page">
          <ChevronLeftIcon className="h-5 w-5" />
        </Button>
      )}

      {next ? (
        <Link href={next.href}>
          <Button variant="outline" size="icon" aria-label={`Next: ${next.title}`}>
            <ChevronRightIcon className="h-5 w-5" />
          </Button>
        </Link>
      ) : (
        <Button disabled variant="outline" size="icon" aria-label="No next page">
          <ChevronRightIcon className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
