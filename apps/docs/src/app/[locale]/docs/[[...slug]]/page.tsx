import { MDXContent } from '@/components/mdx/mdx-content';
import { DocActions } from '@/features/docs/components/doc-actions';
import { DocsNavigationButtons } from '@/features/docs/components/docs-navigation-button';
import { DocsPagination } from '@/features/docs/components/docs-pagination';
import { MobileToc } from '@/features/docs/components/mobile-toc';
import { Toc } from '@/features/docs/components/toc';
import { ContentRepository } from '@/lib/content-repository';
import { buildAlternates, getAbsoluteUrl } from '@/lib/domains';
import { allDocs as docs } from 'content-collections';
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

  return ContentRepository.getDocBySlug(slug, locale);
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
      <article className="doc-container flex w-full min-w-0 flex-col">
        <div className="mt-8 mb-10 flex flex-col gap-1 sm:mt-10 sm:mb-12">
          <MobileToc toc={tocContent} />
          <div className="flex flex-col gap-3">
            <h1 className="font-heading text-foreground text-3xl font-bold tracking-tighter sm:text-4xl lg:text-5xl">
              {doc.title}
            </h1>
            {doc.description && (
              <p className="text-muted-foreground max-w-2xl text-base leading-relaxed sm:text-lg">
                {doc.description}
              </p>
            )}
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pb-5">
            <DocActions
              page={doc.title}
              url={getAbsoluteUrl(doc.locale || 'en', `/docs/${doc.slugAsParams}`)}
              filePath={doc.sourceFilePath}
              rawContent={doc.raw}
            />
            <DocsNavigationButtons currentPath={currentPath} />
          </div>
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
  const canonicalUrl = getAbsoluteUrl(locale, `/docs/${slugPath}`);

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      locale: locale,
      url: canonicalUrl,
      siteName: 'NachUI',
      images: [
        {
          url: getAbsoluteUrl(locale, `/docs/${slugPath}/opengraph-image`),
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
      images: [getAbsoluteUrl(locale, `/docs/${slugPath}/opengraph-image`)],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: buildAlternates(`/docs/${slugPath}`),
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

export const revalidate = 3600;
