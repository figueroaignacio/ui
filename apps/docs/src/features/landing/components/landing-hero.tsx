import { GitHubIcon } from '@/components/common/tech-icons';
import { Link } from '@/i18n/navigation';
import { ArrowRight02Icon, SourceCodeIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import { useTranslations } from 'next-intl';
import { HeroComponentPreview } from './hero-component-preview';
import { ThemeColorSwitcher } from '@/features/theme/components/theme-color-switcher';

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
      <section className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-center space-y-3">
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
        <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row">
          <div className="border-border/50 bg-muted/30 flex items-center gap-2.5 rounded-full border px-3 py-1.5 backdrop-blur-sm">
            <span className="text-muted-foreground mr-1 text-xs font-medium">Theme</span>
            <ThemeColorSwitcher />
          </div>
          <div className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-2 text-sm transition-colors">
            <GitHubIcon />
            <a
              href="https://github.com/figueroaignacio/ui"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {t('github')}
            </a>
          </div>
        </div>
        <div className="w-full">
          <HeroComponentPreview />
        </div>
      </section>
    </div>
  );
}
