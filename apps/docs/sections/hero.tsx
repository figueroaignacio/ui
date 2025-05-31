// Hooks
import { useTranslations } from 'next-intl';

// Components
import { Button, ButtonGroup } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export function Hero() {
  const t = useTranslations('sections');

  const actions = [
    {
      label: t('hero.actions.getStarted'),
      href: '/docs',
      variant: 'default' as const,
    },
    {
      label: t('hero.actions.exploreComponents'),
      href: '/docs/concepts/overview',
      variant: 'outline' as const,
    },
  ];

  return (
    <section className="flex min-h-[50dvh] flex-col items-center justify-center gap-y-4 text-center">
      {/* <div className="bg-secondary text-primary w-fit rounded-xl px-4">{t('hero.badge')}</div> */}
      <h1 className="text-3xl font-extrabold lg:max-w-xl lg:text-4xl">{t('hero.title')}</h1>
      <h2 className="text-muted-foreground lg:max-w-xl">{t('hero.subtitle')}</h2>
      <ButtonGroup>
        {actions.map((action) => (
          <Link href={action.href} key={action.href}>
            <Button variant={action.variant}>{action.label}</Button>
          </Link>
        ))}
      </ButtonGroup>
    </section>
  );
}
