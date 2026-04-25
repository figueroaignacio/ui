import { BricksHero } from '@/features/bricks/components/bricks-hero';
import { BRICK_CATEGORIES } from '@/features/bricks/lib/bricks-registry';
import { Link } from '@/i18n/navigation';
import { ArrowRight02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { setRequestLocale } from 'next-intl/server';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function BricksPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-background relative min-h-svh overflow-hidden pb-24">
      <BricksHero />

      <div className="mx-auto w-full max-w-7xl px-4 pt-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {BRICK_CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/bricks/${category.slug}`}
              className="group border-border bg-background hover:bg-surface-muted hover:border-foreground/30 relative flex flex-col justify-between overflow-hidden rounded-2xl border p-6 transition-all duration-300"
            >
              <div className="space-y-4">
                <div className="bg-surface-muted text-foreground border-border flex size-12 items-center justify-center rounded-xl border shadow-sm">
                  <span className="text-lg font-bold">{category.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-foreground text-xl font-semibold tracking-tight">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm leading-relaxed">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className="mt-8 flex items-center text-sm font-medium">
                <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                  {category.bricks.length} component{category.bricks.length !== 1 ? 's' : ''}
                </span>
                <span className="text-foreground ml-auto -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100">
                  <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
