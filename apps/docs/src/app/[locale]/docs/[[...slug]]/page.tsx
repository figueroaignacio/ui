export const dynamic = 'force-dynamic';

import { MDXContent } from '@/components/mdx/mdx-content';
import { docs } from '@/content';
import { DocActions } from '@/features/docs/components/doc-actions';
import { DocsNavigationButtons } from '@/features/docs/components/docs-navigation-button';
import { DocsPagination } from '@/features/docs/components/docs-pagination';
import { Toc } from '@/features/docs/components/toc';
import { getDocBySlug } from '@/features/docs/lib/get-docs-by-slug';
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';
import { notFound } from 'next/navigation';

type DocPageProps = {
  slug: string[];
  locale?: Locale;
};

async function getDocFromParams({ params }: { params: Promise<DocPageProps> }) {
  const parameters = await params;
  const slug = parameters.slug?.join('/') || '';
  const locale = parameters.locale || 'en';

  return getDocBySlug(slug, locale);
}

export default async function DocPage({ params }: { params: Promise<DocPageProps> }) {
  const doc = await getDocFromParams({ params });

  if (!doc || !doc.published) {
    notFound();
  }

  const tocContent = Array.isArray(doc.toc?.content) ? doc.toc.content : [];
  const currentPath = `/docs${doc.slugAsParams ? `/${doc.slugAsParams}` : ''}`;

  return (
    <>
      <article className="flex w-full min-w-0 flex-col lg:px-26">
        <div className="my-9 flex flex-col gap-6">
          <div className="flex items-center justify-between gap-4">
            <h1 className="gradient-text text-4xl font-bold">{doc.title}</h1>
            <div className="flex items-center gap-2">
              <DocActions
                componentName={doc.title}
                url={`https://nach-ui.vercel.app/${doc.locale}/docs/${doc.slugAsParams}`}
                filePath={doc.sourceFilePath}
              />
              <DocsNavigationButtons currentPath={currentPath} />
            </div>
          </div>
          <p className="text-muted-foreground">{doc.description}</p>
        </div>
        <div className="min-w-0 flex-1">
          {doc.body ? <MDXContent code={doc.body} /> : <div>Error</div>}
        </div>
        <DocsPagination currentPath={currentPath} />
      </article>
      <div className="hidden lg:block">
        <Toc toc={tocContent} />
      </div>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<DocPageProps>;
}): Promise<Metadata> {
  const doc = await getDocFromParams({ params });
  const parameters = await params;
  const locale = parameters.locale || 'en';
  const slugPath = parameters.slug?.join('/') || '';

  if (!doc) {
    return {
      title: 'Documentation not found',
    };
  }

  const metaTitle = doc.title;
  const metaDescription = doc.description;
  const url = `https://i7a-ui.vercel.app/${locale}/docs/${slugPath}`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      locale: locale,
      url: url,
      siteName: 'i7a-ui',
      images: [
        {
          url: `/${locale}/docs/${slugPath}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [`/${locale}/docs/${slugPath}/opengraph-image`],
    },
    alternates: {
      canonical: url,
      languages: {
        es: `https://i7a-ui.vercel.app/es/docs/${slugPath}`,
        en: `https://i7a-ui.vercel.app/en/docs/${slugPath}`,
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
  if (!Array.isArray(docs)) {
    console.error('docs is not an array!', typeof docs);
    return [];
  }

  return docs
    .filter((doc) => doc.slugAsParams && doc.published)
    .map((doc) => ({
      slug: doc.slugAsParams.split('/').filter(Boolean),
      locale: doc.locale || 'en',
    }));
}
