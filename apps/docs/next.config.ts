import type { NextConfig } from 'next';

// next-intl
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  typedRoutes: true,
  outputFileTracingIncludes: {
    '/': ['../../packages/ui/src/samples/**'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
