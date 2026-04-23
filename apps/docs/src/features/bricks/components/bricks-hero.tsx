import { Link } from '@/i18n/navigation';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import { useTranslations } from 'next-intl';
import { BRICK_CATEGORIES } from '../lib/bricks-registry';

interface BricksHeroProps {
  activeSlug?: string;
}

interface BricksHeroActions {
  label: string;
  href: string;
  variant: 'default' | 'secondary';
}

export function BricksHero({ activeSlug }: BricksHeroProps) {
  const t = useTranslations('sections.bricks');
  const actions: BricksHeroActions[] = t.raw('actions');

  return (
    <div className="bg-background relative flex flex-col items-center justify-start overflow-hidden pt-24 pb-8">
      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center space-y-3">
        <div className="space-y-2 text-center">
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight lg:text-5xl">
            {t('title')}
          </h1>
          <p className="text-muted-foreground text-4xl font-extrabold tracking-tight lg:text-5xl">
            {t('subtitle')}
          </p>
        </div>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg">
          {t('description')}
        </p>
        <div className="flex items-center gap-4">
          {actions.map((action) => (
            <Button
              key={action.label}
              variant={action.variant}
              size="sm"
              rightIcon={<HugeiconsIcon icon={ArrowRight02Icon} size={14} />}
              asChild
            >
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ))}
        </div>
      </section>
      <nav
        className="mt-12 flex w-full max-w-7xl items-center justify-between"
        aria-label="Brick categories"
      >
        <div className="flex items-center gap-4">
          {BRICK_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/bricks/${category.slug}`}
              className={
                activeSlug === category.slug
                  ? 'text-foreground border-foreground border-b-2 pb-1 text-sm font-semibold'
                  : 'text-muted-foreground hover:text-foreground pb-1 text-sm transition-colors'
              }
              aria-current={activeSlug === category.slug ? 'page' : undefined}
            >
              {category.name}
            </Link>
          ))}
        </div>
        <Link
          href="/bricks/login"
          className="text-muted-foreground hover:text-foreground hidden text-sm transition-colors sm:block"
        >
          Browse all bricks →
        </Link>
      </nav>
    </div>
  );
}
