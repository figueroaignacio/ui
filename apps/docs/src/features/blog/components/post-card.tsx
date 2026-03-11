'use client';

import type { Posts } from '@/content';
import { Link } from '@/i18n/navigation';
import { formatDateOnly } from '@/lib/format-date';
import { ArrowUp01 } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { useLocale, useTranslations } from 'next-intl';

export function PostCard({ title, description, slug, date }: Partial<Posts>) {
  const locale = useLocale();
  const t = useTranslations('components.postCard');

  return (
    <Card variant="ghost" className="border-border border shadow-[7px_7px_0px_var(--secondary)]">
      <Card.Header className="space-y-5">
        <span className="text-xs">{date && formatDateOnly(date, locale)}</span>
        <Card.Title>{title}</Card.Title>
      </Card.Header>
      <Card.Content>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Footer className="">
        <Link href={`${slug}`} className="w-full">
          <Button variant="outline" rightIcon={<HugeiconsIcon icon={ArrowUp01} />}>
            {t('action')}
          </Button>
        </Link>
      </Card.Footer>
    </Card>
  );
}
