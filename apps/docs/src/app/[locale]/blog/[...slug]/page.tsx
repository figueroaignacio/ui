export const dynamic = 'force-dynamic';

import { posts } from '@/content';

// Components
import { BackButton } from '@/components/common/back-button';
import { DeveloperWatermark } from '@/components/layout/developer-watermark';
import { MDXContent } from '@/components/mdx/mdx-content';

// Utils
import { getPostsBySlug } from '@/features/blog/lib/get-posts-by-slug';
import { formatDateOnly } from '@/lib/format-date';
import { getLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Types
import type { Locale } from 'next-intl';
import type { Metadata } from 'next/types';

interface PostPageProps {
  slug: string[];
  locale?: Locale;
}

async function getPostFromParams({ params }: { params: Promise<PostPageProps> }) {
  const parameters = await params;
  const slug = parameters.slug?.join('/') || '';
  const locale = parameters.locale || 'en';

  return getPostsBySlug(slug, locale);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PostPageProps>;
}): Promise<Metadata> {
  const parameters = await params;

  const post = await getPostFromParams({ params });
  const locale = parameters.locale || 'en';
  const slugPath = parameters.slug?.join('/') || '';

  if (!post) {
    return {};
  }

  const url = `https://i7a-ui.vercel.app/${locale}/posts/${slugPath}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
      languages: {
        es: `https://i7a-ui.vercel.app/es/blog/${slugPath}`,
        en: `https://i7a-ui.vercel.app/en/blog/${slugPath}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string[]; locale: string }[]> {
  if (!Array.isArray(posts)) {
    console.error('posts is not an array!', typeof posts);
    return [];
  }

  return posts
    .filter((post) => post.slugAsParams && post.published)
    .map((post) => ({
      slug: post.slugAsParams.split('/').filter(Boolean),
      locale: post.locale || 'en',
    }));
}

export default async function PostPage({ params }: { params: Promise<PostPageProps> }) {
  const locale = await getLocale();
  const t = await getTranslations('sections.blog');
  const post = await getPostFromParams({ params });

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl space-y-8 py-10">
      <BackButton />
      <p>{formatDateOnly(post.date, locale)}</p>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p className="text-muted-foreground">{post.description}</p>
      </div>
      <div className="border-border space-y-3 border-b pb-3">
        <p>{t('postedBy')}</p>
        <DeveloperWatermark />
      </div>
      <MDXContent code={post.body} />
    </article>
  );
}
