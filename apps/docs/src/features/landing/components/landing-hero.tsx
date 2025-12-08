// Hooks
import { useTranslations } from 'next-intl';

// Components
import { Link } from '@/i18n/navigation';
import { Button } from '@repo/ui/components/button';
import { ArrowRight, Component } from 'lucide-react';

interface HomePageActions {
  href: string;
  label: string;
  description: string;
  variant?: 'default' | 'secondary';
}

export function LandingHero() {
  const t = useTranslations('sections.home');

  const actions: HomePageActions[] = t.raw('actions');

  return (
    <div className="bg-grid-pattern relative flex min-h-[80svh] items-center justify-center overflow-hidden">
      <section className="relative z-10 max-w-5xl flex-col space-y-4 px-4 py-8 text-center md:px-0">
        <div className="border-primary/20 bg-primary/10 text-primary mx-auto inline-flex w-fit max-w-2xl items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium shadow-md backdrop-blur-sm">
          <span className="bg-primary h-2 w-2 rounded-full motion-safe:animate-pulse" />
          {t('badge')}
        </div>
        <h1 className="text-3xl leading-tight font-extrabold tracking-tight text-balance md:text-5xl">
          {t('subheading')}
        </h1>
        <p className="text-muted-foreground mx-auto max-w-3xl text-base leading-relaxed text-pretty md:text-xl">
          {t('description')}
        </p>
        <div className="z-50 flex flex-wrap justify-center gap-4 pt-6">
          {actions.map((action, index) => {
            const Icon = index === 0 ? ArrowRight : index === 1 ? Component : null;
            return (
              <div key={action.href}>
                <Link href={action.href}>
                  <Button
                    variant={action.variant}
                    size="sm"
                    className="items-center gap-2 font-semibold"
                    rightIcon={Icon ? <Icon className="h-5 w-5" /> : undefined}
                  >
                    {action.label}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
