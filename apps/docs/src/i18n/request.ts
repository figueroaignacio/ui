import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

const messagesCache = {
  en: async () => ({
    ui: (await import('../locales/en/ui.json')).default,
    sections: (await import('../locales/en/sections.json')).default,
    components: (await import('../locales/en/components.json')).default,
    showcase: (await import('../locales/en/showcase.json')).default,
    docs: (await import('../locales/en/docs.json')).default,
  }),
  es: async () => ({
    ui: (await import('../locales/es/ui.json')).default,
    sections: (await import('../locales/es/sections.json')).default,
    components: (await import('../locales/es/components.json')).default,
    showcase: (await import('../locales/es/showcase.json')).default,
    docs: (await import('../locales/es/docs.json')).default,
  }),
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = await messagesCache[locale as keyof typeof messagesCache]();

  return {
    locale,
    messages,
  };
});
