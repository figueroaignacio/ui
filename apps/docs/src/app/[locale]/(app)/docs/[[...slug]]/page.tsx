export const dynamic = 'force-dynamic';

// Content
import { docs } from '@/content';

// Components
import { MobileDocsPagination } from '@/components/docs-mobile-pagination';
import { DocsNavigationButtons } from '@/components/docs-navigation-button';
import { DocsPagination } from '@/components/docs-pagination';
import { MDXContent } from '@/components/mdx/mdx-content';
import { Toc } from '@/components/toc';

// Utils
import { getDocBySlug } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Types
import type { Metadata } from 'next';
import type { Locale } from 'next-intl';

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

export async function generateMetadata({
  params,
}: {
  params: Promise<DocPageProps>;
}): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) {
    return {};
  }

  return {
    title: doc.title,
    description: doc.description,
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

export default async function DocPage({ params }: { params: Promise<DocPageProps> }) {
  const doc = await getDocFromParams({ params });
  const t = await getTranslations('components');

  if (!doc || !doc.published) {
    notFound();
  }

  const tocContent = Array.isArray(doc.toc?.content) ? doc.toc.content : [];
  const currentPath = `/docs${doc.slugAsParams ? `/${doc.slugAsParams}` : ''}`;

  return (
    <>
      <article className="flex w-full min-w-0 flex-col lg:px-36">
        <div className="mb-5 flex items-start justify-between pb-5">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">{doc.title}</h1>
            <p className="text-muted-foreground max-w-lg">{doc.description}</p>
          </div>
          <div className="hidden lg:block">
            <DocsNavigationButtons currentPath={currentPath} />
          </div>
        </div>
        <div className="min-w-0 flex-1 pb-18 lg:pb-0">
          {doc.body ? <MDXContent code={doc.body} /> : <div>Error</div>}
        </div>
        <div className="hidden lg:block">
          <DocsPagination currentPath={currentPath} />
        </div>
      </article>
      <div className="hidden lg:block">
        <Toc toc={tocContent} />
      </div>
      <MobileDocsPagination currentPath={currentPath} />
    </>
  );
}
