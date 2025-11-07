// Components
import { BgBlur } from '@/components/bg-blur';
import { Link } from '@/i18n/navigation';
import { Button } from '@repo/ui/components/button';

// Utils
import { getTranslations, setRequestLocale } from 'next-intl/server';

// Types
import type { Metadata } from 'next';

type PageProps = {
  params: Promise<{ locale: string }>;
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
      locale,
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
    <div className="relative px-4">
      <BgBlur />
      <section className="flex min-h-[50svh] flex-col justify-center space-y-3 px-0 py-3 text-left md:px-3">
        <div className="border-primary/20 bg-primary/10 text-primary inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium">
          <span className="bg-primary h-2 w-2 rounded-full" />
          {t('home.badge')}
        </div>
        <h1 className="max-w-3xl text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">
          {t('home.subheading')}
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed text-pretty md:text-lg">
          {t('home.description')}
        </p>
        <div className="z-50 flex flex-wrap gap-3 pt-4">
          {actions.map((action) => (
            <Button
              key={action.href}
              variant={action.variant}
              size="sm"
              className="transition-transform hover:scale-[1.03]"
            >
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
