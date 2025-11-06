// Components
import { Link } from '@/i18n/navigation';
import { Button } from '@repo/ui/components/button';

// Utils
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Types
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

interface HomePageActions {
  href: string;
  label: string;
  description: string;
  variant?: 'default' | 'secondary';
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'siteConfig' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `https://i7a-ui.vercel.app/${locale}`,
      siteName: 'I7A UI',
      images: [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: t('description'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`/${locale}/opengraph-image`],
    },
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('sections');
  const actions: HomePageActions[] = t.raw('home.actions');

  return (
    <div className="relative flex min-h-[60svh] items-center justify-center">
      <div className="bg-grid-pattern absolute inset-0 -z-10"></div>
      <div>
        <section className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-6 text-center">
              <div className="space-y-3">
                <div className="inline-block">
                  <span className="bg-primary/20 border-accent/50 text-primary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
                    <span className="bg-primary h-2 w-2 rounded-full"></span>
                    Componentes UI Profesionales
                  </span>
                </div>
                <h1 className="text-2xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">
                  {t('home.subheading')}
                </h1>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed text-pretty md:text-lg">
                {t('home.description')}
              </p>
            </div>
            <div className="flex w-full justify-center gap-3">
              {actions.map((action) => (
                <Button key={action.href} variant={action.variant} size="sm">
                  <Link href={action.href}>{action.label}</Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
