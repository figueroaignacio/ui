// Components
import { CardLink } from '@/components/card-link';
import { Logo } from '@/components/logo';

// Utils
import { getTranslations, setRequestLocale } from 'next-intl/server';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

interface HomePageActions {
  href: string;
  label: string;
  description: string;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('sections');
  const actions: HomePageActions[] = t.raw('home.actions');

  return (
    <div className="flex min-h-svh items-center justify-center">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--border))_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:4rem_4rem]" />
      <div className="relative">
        <section className="mx-auto max-w-6xl px-4 py-12">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-sm font-medium tracking-wider">
                  <Logo />
                </h1>
                <h2 className="text-2xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">
                  {t('home.subheading')}
                </h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed text-pretty md:text-lg">
                {t('home.description')}
              </p>
            </div>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              {actions.map((action) => (
                <CardLink
                  key={action.href}
                  label={action.label}
                  href={action.href}
                  description={action.description}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
