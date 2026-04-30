/**
 * Centralized domain configuration for multilingual SEO.
 *
 * Domains:
 *   en → https://en.nachui.tech
 *   es → https://es.nachui.tech
 *
 * Used by: robots.ts, sitemap.ts, metadata (canonical, hreflang, OG).
 */

export const domainMap = {
  en: 'https://en.nachui.tech',
  es: 'https://es.nachui.tech',
} as const;

export type SupportedLocale = keyof typeof domainMap;

export const locales = Object.keys(domainMap) as SupportedLocale[];

export const defaultLocale: SupportedLocale = 'en';

export function getDomainForLocale(locale: string): string {
  return domainMap[locale as SupportedLocale] ?? domainMap[defaultLocale];
}

export function getAbsoluteUrl(locale: string, path = ''): string {
  const domain = getDomainForLocale(locale);
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${domain}${cleanPath}`;
}

export function buildAlternates(path = '') {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] = `${domainMap[locale]}${cleanPath}`;
  }
  languages['x-default'] = `${domainMap[defaultLocale]}${cleanPath}`;

  return languages;
}
