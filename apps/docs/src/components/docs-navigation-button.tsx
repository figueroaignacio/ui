'use client';

import { useDocsNavigation } from '@/hooks/use-docs-navigation';
import { Link } from '@/i18n/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

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
  const baseClasses =
    'flex h-9 w-9 items-center justify-center rounded-md border transition-colors';

  if (disabled || !href) {
    return (
      <button
        disabled
        className={`${baseClasses} border-border cursor-not-allowed opacity-50`}
        aria-label={label}
      >
        <Icon className="h-4 w-4" />
      </button>
    );
  }

  return (
    <Link href={href} className={`${baseClasses} border-border hover:bg-accent`} aria-label={label}>
      <Icon className="h-4 w-4" />
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
