import { docs as rawDocs } from '@content';
import { Locale } from 'next-intl';

export const docs = Array.isArray(rawDocs) ? rawDocs : [];

export function getDocBySlug(slug: string, locale: Locale) {
  return docs.find((doc) => doc.slugAsParams === slug && doc.locale === locale);
}
