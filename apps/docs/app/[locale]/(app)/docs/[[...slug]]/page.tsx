// Components
import { MDXContentRenderer } from '@/components/mdx/mdx-content-renderer';

// Content
import { docs } from '@content';

// Components
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

  if (!doc || !doc.published) {
    notFound();
  }

  const tocContent = Array.isArray(doc.toc?.content) ? doc.toc.content : [];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[210px_1fr_210px]">
      <div className="lg:hidden">
        <MobileToc toc={tocContent} />
      </div>
      <div>
        <Sidebar />
      </div>
      <article className="lg:px-36 lg:py-5">
        <div className="border-border space-y-3 border-b pb-5">
          <h1 className="text-2xl font-bold">{doc.title}</h1>
          <p className="text-muted-foreground">{doc.description}</p>
        </div>
        {doc.body ? (
          <MDXContentRenderer code={doc.body} />
        ) : (
          <Callout variant="default">
            <CalloutTitle>{t('docs.fallback.title')}</CalloutTitle>
            <CalloutDescription>{t('docs.fallback.description')}</CalloutDescription>
          </Callout>
        )}
      </article>
      <div>
        <Toc toc={tocContent} />
      </div>
    </div>
  );
}
