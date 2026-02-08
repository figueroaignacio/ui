import { useDocsNavigation } from '@/features/docs/hooks/use-docs-navigation';
import { Link } from '@/i18n/navigation';
import { ArrowLeft01Icon, ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useTranslations } from 'next-intl';

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
  const icon = direction === 'prev' ? ArrowLeft01Icon : ArrowRight01Icon;
  const isNext = direction === 'next';

  if (!item) {
    return <div className="flex-1" />;
  }

  return (
    <Link
      href={item.href}
      className={`border-border hover:bg-secondary group flex flex-1 flex-col gap-2 rounded-lg border p-4 transition-colors ${isNext ? 'text-right' : ''}`}
    >
      <span
        className={`text-muted-foreground flex items-center gap-2 text-sm ${isNext ? 'justify-end' : ''}`}
      >
        {!isNext && <HugeiconsIcon icon={icon} className="h-4 w-4" />}
        {label}
        {isNext && <HugeiconsIcon icon={icon} className="h-4 w-4" />}
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
    <div className="mt-12 flex flex-col justify-between gap-4 py-2 lg:flex-row">
      <PaginationLink item={prev} direction="prev" label={t('previous')} />
      <PaginationLink item={next} direction="next" label={t('next')} />
    </div>
  );
}
