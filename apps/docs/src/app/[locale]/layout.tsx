import { cookies } from 'next/headers';

// Components
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { Providers } from '@/components/providers';

// Utils
import { routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Global Styles
import { fontSans } from '@/lib/font';
import '@repo/ui/globals.css';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export const metadata = {
  title: {
    template: `%s - I7A UI`,
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

  const cookieStore = await cookies();
  const themeCookie = cookieStore.get('theme');
  const theme = themeCookie?.value === 'light' ? 'light' : 'dark';

  return (
    <html lang={locale} suppressHydrationWarning className={theme}>
      <body className={`relative ${fontSans.className}`}>
        <NextIntlClientProvider>
          <Providers>
            <div className="flex min-h-screen flex-col lg:pb-0">
              <Header />
              <main className="px-6">{children}</main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
