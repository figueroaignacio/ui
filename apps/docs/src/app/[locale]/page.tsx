import { FAQSection } from '@/features/landing/components/faq-section';
import { LandingHero } from '@/features/landing/components/landing-hero';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'sections.faq' });
  const faqs = t.raw('items');

  return (
    <>
      <LandingHero />
      <FAQSection faqs={faqs} title={t('title')} />
    </>
  );
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
      siteName: 'NachUI UI',
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
    alternates: {
      canonical: `https://i7a-ui.vercel.app`,
      languages: {
        es: `https://i7a-ui.vercel.app/es`,
        en: `https://i7a-ui.vercel.app/en`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
