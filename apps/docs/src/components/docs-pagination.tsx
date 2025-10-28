// Hooks
import { useTranslations } from 'next-intl';

// Components
import { useDocsNavigation } from '@/hooks/use-docs-navigation';
import { Link } from '@/i18n/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

type DocsPaginationProps = {
  currentPath: string;
};

type NavItem = {
  title: string;
  href: string;
};

function PaginationLink({
  item,
  direction,
  label,
}: {
  item: NavItem | null;
  direction: 'prev' | 'next';
  label: string;
}) {
  const Icon = direction === 'prev' ? ChevronLeftIcon : ChevronRightIcon;
  const isNext = direction === 'next';

  if (!item) {
    return <div className="flex-1" />;
  }

  return (
    <Link
      href={item.href}
      className={`border-border hover:bg-secondary group flex flex-1 flex-col gap-2 rounded-xl border p-4 transition-colors ${isNext ? 'text-right' : ''}`}
    >
      <span
        className={`text-muted-foreground flex items-center gap-2 text-sm ${isNext ? 'justify-end' : ''}`}
      >
        {!isNext && <Icon className="h-4 w-4" />}
        {label}
        {isNext && <Icon className="h-4 w-4" />}
      </span>
      <span className="font-medium group-hover:underline">{item.title}</span>
    </Link>
  );
}

export function DocsPagination({ currentPath }: DocsPaginationProps) {
  const t = useTranslations('components.docsPagination');
  const { prev, next } = useDocsNavigation(currentPath);

  if (!prev && !next) {
    return null;
  }

  return (
    <div className="mt-12 flex items-center justify-between gap-4 py-2">
      <PaginationLink item={prev} direction="prev" label={t('previous')} />
      <PaginationLink item={next} direction="next" label={t('next')} />
    </div>
  );
}
