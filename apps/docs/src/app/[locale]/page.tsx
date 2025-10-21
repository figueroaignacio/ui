// Components
import { CardLink } from '@/components/card-link';

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
    <div className="flex min-h-[85svh] items-center justify-center">
      <div>
        <section className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <h1 className="text-2xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">
                  {t('home.subheading')}
                </h1>
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
