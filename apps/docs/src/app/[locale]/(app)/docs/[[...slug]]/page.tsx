// Content
import { docs } from '@/velite-content';

// Utils
import { DocsNavigationButtons } from '@/components/docs-navigation-button';
import { DocsPagination } from '@/components/docs-pagination';
import { getDocBySlug } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Types
import { MDXContent } from '@/components/mdx/mdx-content';
import { Sidebar } from '@/components/sidebar';
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

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  if (!Array.isArray(docs)) {
    console.error('docs is not an array!', typeof docs);
    return [];
  }

  return docs
    .filter((doc) => doc.slugAsParams)
    .map((doc) => ({
      slug: doc.slugAsParams.split('/').filter(Boolean),
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
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[210px_1fr_210px]">
      {/* <div className="lg:hidden">
        <MobileToc toc={tocContent} />
      </div> */}
      <div>
        <Sidebar />
      </div>
      <article className="lg:px-36 lg:py-5">
        <div className="border-border flex items-start justify-between border-b pb-5">
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">{doc.title}</h1>
            <p className="text-muted-foreground">{doc.description}</p>
          </div>
          <DocsNavigationButtons currentPath={currentPath} />
        </div>
        {doc.body ? <MDXContent code={doc.body} /> : <div>Error</div>}
        <DocsPagination currentPath={currentPath} />
      </article>
      <div className="hidden lg:block">{/* <Toc toc={tocContent} /> */}</div>
    </div>
  );
}
