// Components
import { MDXContentRenderer } from '@/components/mdx/mdx-content-renderer';

// Content
import { docs } from '@content';

// Components
import { DocsNavigationButtons } from '@/components/docs-navigation-buttons';
import { DocsPagination } from '@/components/docs-pagination';
import { Callout, CalloutDescription, CalloutTitle } from '@/components/mdx/callout';
import { MobileToc } from '@/components/mdx/mobile-toc';
import { Toc } from '@/components/mdx/toc';
import { Sidebar } from '@/components/sidebar';

// Utils
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

  const doc = docs.find((doc) => doc.slugAsParams === slug && doc.locale === locale);

  return doc || null;
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
  return docs.map((doc) => ({
    slug: doc.slugAsParams.split('/'),
  }));
}

export default async function DocPage({ params }: { params: Promise<DocPageProps> }) {
  const doc = await getDocFromParams({ params });
  const t = await getTranslations('components');

  console.log('=== DEBUG ===');
  console.log('doc exists:', !!doc);
  console.log('doc.toc:', doc?.toc);
  console.log('doc.toc.content type:', typeof doc?.toc?.content);
  console.log('is array?:', Array.isArray(doc?.toc?.content));
  console.log('docs type:', typeof docs);
  console.log('docs is array?:', Array.isArray(docs));
  console.log('=============');

  if (!doc || !doc.published) {
    notFound();
  }

  const tocContent = Array.isArray(doc.toc?.content) ? doc.toc.content : [];

  const validDocs = Array.isArray(docs) ? docs : [];

  const currentPath = `/docs${doc.slugAsParams ? `/${doc.slugAsParams}` : ''}`;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[210px_1fr_210px]">
      <div className="lg:hidden">
        <MobileToc toc={tocContent} />
      </div>
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
        {doc.body ? (
          <MDXContentRenderer code={doc.body} />
        ) : (
          <Callout variant="default">
            <CalloutTitle>{t('docs.fallback.title')}</CalloutTitle>
            <CalloutDescription>{t('docs.fallback.description')}</CalloutDescription>
          </Callout>
        )}
        <DocsPagination currentPath={currentPath} />
      </article>
      <div>
        <Toc toc={tocContent} />
      </div>
    </div>
  );
}
