// Components
import { MDXContentRenderer } from '@/components/mdx/mdx-content-renderer';

// Content
import { docs } from '@content';

// Utils
import { Toc } from '@/components/mdx/toc';
import { Sidebar } from '@/components/sidebar';
import { notFound } from 'next/navigation';

// Metadata
import type { Metadata } from 'next';

enum Locale {
  EN = 'en',
  ES = 'es',
}

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

  if (!doc || !doc.published) {
    notFound();
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[210px_1fr_210px]">
      <div className="border-border hidden lg:block lg:border-l lg:py-5 lg:pl-5">
        <Sidebar />
      </div>
      <article className="py-5 lg:px-12">
        <div className="space-y-3">
          <h1 className="text-xl font-bold">{doc.title}</h1>
          <p className="text-muted-foreground">{doc.description}</p>
        </div>
        <MDXContentRenderer code={doc.body} />
      </article>
      <div className="lg:border-border hidden lg:block lg:border-r lg:px-5 lg:py-5">
        <Toc toc={doc.toc.content} />
      </div>
    </div>
  );
}
