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
        <NextIntlClientProvider>
          <Providers>
            <Header />
            <main className="container mx-auto px-4">{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
