import { allDocs as rawDocs } from 'content-collections';

export const docs = Array.isArray(rawDocs) ? rawDocs : [];

export function getDocBySlug(slug: string, locale: string) {
  return docs.find((doc) => doc.slugAsParams === slug && doc.locale === locale);
}
