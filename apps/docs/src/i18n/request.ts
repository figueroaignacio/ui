import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { namespaces } from './namespaces';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = await namespaces[locale as keyof typeof namespaces]();

  return {
    locale,
    messages,
  };
});
