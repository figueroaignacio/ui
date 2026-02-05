'use client';

import { useDocsNavigation } from '@/features/docs/hooks/use-docs-navigation';
import { Link } from '@/i18n/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';

type DocsNavigationButtonsProps = {
  currentPath: string;
};

type NavIconButtonProps = {
  href?: string;
  label: string;
  icon: typeof ChevronLeftIcon;
  disabled?: boolean;
};

function NavIconButton({ href, label, icon: Icon, disabled }: NavIconButtonProps) {
  if (disabled || !href) {
    return (
      <Button disabled size="icon" variant="outline" aria-label={label}>
        <Icon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Link href={href} aria-label={label}>
      <Button size="icon" variant="outline">
        <Icon className="h-4 w-4" />
      </Button>
    </Link>
  );
}

export function DocsNavigationButtons({ currentPath }: DocsNavigationButtonsProps) {
  const { prev, next } = useDocsNavigation(currentPath);

  return (
    <div className="flex items-center gap-1">
      <NavIconButton
        href={prev?.href}
        label={prev ? `Previous: ${prev.title}` : 'No previous page'}
        icon={ChevronLeftIcon}
        disabled={!prev}
      />
      <NavIconButton
        href={next?.href}
        label={next ? `Next: ${next.title}` : 'No next page'}
        icon={ChevronRightIcon}
        disabled={!next}
      />
    </div>
  );
}
