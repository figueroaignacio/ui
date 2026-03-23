import { GitHubIcon } from '@/components/common/tech-icons';
import { Link } from '@/i18n/navigation';
import { ArrowRight02Icon, SourceCodeIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import { useTranslations } from 'next-intl';
import { HeroComponentPreview } from './hero-component-preview';

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
    <div className="bg-background relative flex min-h-svh flex-col items-center justify-start overflow-hidden pt-24 pb-16">
      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center space-y-3 px-4 md:px-6">
        <div className="space-y-2 text-center">
          <h1 className="text-foreground text-4xl font-extrabold tracking-tight lg:text-5xl">
            {t('subheading1')}
          </h1>
          <h1 className="text-muted-foreground text-4xl font-extrabold tracking-tight lg:text-5xl">
            {t('subheading2')}
          </h1>
        </div>
        <p className="text-muted-foreground mx-auto max-w-2xl text-center text-lg">
          {t('description')}
        </p>
        <div className="flex items-center gap-4">
          <Button size="sm" rightIcon={<HugeiconsIcon icon={ArrowRight02Icon} size={14} />} asChild>
            <Link href="/docs">{actions[0]?.label || 'Get started'}</Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<HugeiconsIcon icon={SourceCodeIcon} size={14} />}
            asChild
          >
            <Link href="/docs/components">{actions[1]?.label || 'View components'}</Link>
          </Button>
        </div>
        <div className="text-muted-foreground hover:text-foreground mt-2 flex cursor-pointer items-center gap-2 text-sm transition-colors">
          <GitHubIcon />
          <span>{t('github')}</span>
        </div>
        <div className="w-full">
          <HeroComponentPreview />
        </div>
      </section>
    </div>
  );
}
