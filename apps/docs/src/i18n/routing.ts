import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'never',
  },
  domains: [
    {
      domain: 'en.nachui.tech',
      locales: ['en'],
      defaultLocale: 'en',
    },
    {
      domain: 'es.nachui.tech',
      locales: ['es'],
      defaultLocale: 'es',
    },
  ],
});
