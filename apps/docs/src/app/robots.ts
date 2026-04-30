import type { MetadataRoute } from 'next';

import { domainMap, locales } from '@/lib/domains';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/'],
      },
    ],
    sitemap: locales.map((locale) => `${domainMap[locale]}/sitemap.xml`),
  };
}
