import { allDocs as docs, allPosts as posts } from 'content-collections';
import { buildAlternates, getDomainForLocale, locales } from '@/lib/domains';
import type { MetadataRoute } from 'next';

type SitemapEntry = MetadataRoute.Sitemap[number];

function entry(
  locale: string,
  path: string,
  opts: { changeFrequency: SitemapEntry['changeFrequency']; priority: number; lastModified?: Date },
): SitemapEntry {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return {
    url: `${getDomainForLocale(locale)}${cleanPath}`,
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency,
    priority: opts.priority,
    alternates: {
      languages: buildAlternates(cleanPath),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    entry(locale, '/', { changeFrequency: 'daily', priority: 1 }),
    entry(locale, '/docs', { changeFrequency: 'weekly', priority: 0.9 }),
    entry(locale, '/docs/components', { changeFrequency: 'weekly', priority: 0.9 }),
    entry(locale, '/blog', { changeFrequency: 'daily', priority: 0.8 }),
  ]);

  const docPages: MetadataRoute.Sitemap = docs
    .filter((doc) => doc.published)
    .flatMap((doc) => {
      return locales.map((locale) => {
        const localizedDoc = docs.find(
          (d) => d.locale === locale && d.slug === doc.slug.replace(/\/(es|en)\//, `/${locale}/`),
        );
        const slugPath = localizedDoc?.slugAsParams || doc.slugAsParams || '';

        return entry(locale, `/docs/${slugPath}`, {
          changeFrequency: 'weekly',
          priority: 0.8,
          lastModified: localizedDoc?.date ? new Date(localizedDoc.date) : undefined,
        });
      });
    });

  const blogPages: MetadataRoute.Sitemap = posts
    .filter((post) => post.published)
    .flatMap((post) => {
      return locales.map((locale) => {
        const localizedPost = posts.find(
          (p) => p.locale === locale && p.slug === post.slug.replace(/\/(es|en)\//, `/${locale}/`),
        );
        const slugPath = localizedPost?.slugAsParams || post.slugAsParams || '';

        return entry(locale, `/blog/${slugPath}`, {
          changeFrequency: 'monthly',
          priority: 0.7,
          lastModified: localizedPost?.date ? new Date(localizedPost.date) : undefined,
        });
      });
    });

  const allPages = [...staticPages, ...docPages, ...blogPages];
  const uniquePages = Array.from(new Map(allPages.map((page) => [page.url, page])).values());

  return uniquePages;
}
