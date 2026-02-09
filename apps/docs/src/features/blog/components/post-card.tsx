import type { Posts } from '@/content';
import { Link } from '@/i18n/navigation';
import { formatDateOnly } from '@/lib/format-date';
import { ArrowUp01 } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { getLocale, getTranslations } from 'next-intl/server';

export async function PostCard({ title, description, slug, date }: Partial<Posts>) {
  const locale = await getLocale();
  const t = await getTranslations('components.postCard');

  return (
    <Card variant="ghost" className="border-border border shadow-[7px_7px_0px_var(--secondary)]">
      <CardHeader className="space-y-5">
        <span className="text-xs">{date && formatDateOnly(date, locale)}</span>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="">
        <Link href={`${slug}`} className="w-full">
          <Button variant="outline" rightIcon={<HugeiconsIcon icon={ArrowUp01} />}>
            {t('action')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
