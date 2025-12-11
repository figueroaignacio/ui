import { docs, posts } from '@/content';
import { MetadataRoute } from 'next';

const locales = ['es', 'en'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/';

  const staticPages: MetadataRoute.Sitemap = [
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    })),
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/docs/components`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
  ];

  const docPages: MetadataRoute.Sitemap = docs
    .filter((doc) => doc.published)
    .flatMap((doc) => {
      const docsByLocale = docs.filter(
        (d) => d.slug.replace(`/docs/`, '').split('/')[0] === doc.locale,
      );

      return locales.map((locale) => {
        const localizedDoc = docs.find(
          (d) => d.locale === locale && d.slug === doc.slug.replace(/\/(es|en)\//, `/${locale}/`),
        );

        return {
          url: `${baseUrl}/${locale}${localizedDoc?.slug || doc.slug}`,
          lastModified: localizedDoc?.date ? new Date(localizedDoc.date) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        };
      });
    });

  const blogPages: MetadataRoute.Sitemap = posts
    .filter((post) => post.published)
    .flatMap((post) => {
      return locales.map((locale) => {
        const localizedPost = posts.find(
          (p) => p.locale === locale && p.slug === post.slug.replace(/\/(es|en)\//, `/${locale}/`),
        );

        return {
          url: `${baseUrl}/${locale}${localizedPost?.slug || post.slug}`,
          lastModified: localizedPost?.date ? new Date(localizedPost.date) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      });
    });

  const allPages = [...staticPages, ...docPages, ...blogPages];
  const uniquePages = Array.from(new Map(allPages.map((page) => [page.url, page])).values());

  return uniquePages;
}
