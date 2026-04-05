import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Providers } from '@/components/providers';
import { routing } from '@/i18n/routing';
import { fontHeading, fontSans } from '@/lib/font';
import '@repo/ui/globals.css';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: 'NachUI',
    template: `NachUI - %s`,
  },
  description: 'Next-generation React components built for performance.',
  openGraph: {
    title: 'NachUI',
    description: 'Next-generation React components built for performance.',
    siteName: 'NachUI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NachUI',
    description: 'Next-generation React components built for performance.',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'NachUI',
      description: 'Next-generation React components built for performance.',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
    }),
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`relative ${fontSans.variable} ${fontHeading.variable}`}>
        <a
          href="#main-content"
          className="focus:bg-background focus:ring-ring sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:shadow-lg focus:ring-2 focus:outline-none"
        >
          Skip to main content
        </a>
        <NextIntlClientProvider>
          <Providers>
            <Header />
            <main id="main-content" className="container mx-auto px-4">
              {children}
            </main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
