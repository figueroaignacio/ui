// Components
import { MDXContentRenderer } from '@/components/mdx/mdx-content-renderer';
import { MobileToc } from '@/components/mdx/mobile-toc';
import { Toc } from '@/components/mdx/toc';
import { Sidebar } from '@/components/sidebar';
import Balancer from 'react-wrap-balancer';

// Content
import { docs } from '@content';

// Utils
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
    <>
      <header className="lg:hidden">
        <MobileToc toc={doc.toc.content} />
      </header>
      <div className="bg-background grid grid-cols-1 gap-6 lg:grid-cols-[270px_1fr_270px]">
        <aside className="sticky top-14 z-20 hidden h-[calc(100vh-3.5rem)] py-6 lg:block">
          <Sidebar />
        </aside>
        <main className="relative top-14 min-w-0 py-6">
          <div className="mx-auto md:px-4 lg:px-0">
            <div className="space-y-2">
              <h1 className="scroll-m-20 text-2xl font-bold tracking-tight">{doc.title}</h1>
              {doc.description && (
                <p className="text-muted-foreground">
                  <Balancer>{doc.description}</Balancer>
                </p>
              )}
            </div>
            <div className="pt-8 pb-12">
              <MDXContentRenderer code={doc.body} />
            </div>
          </div>
        </main>
        {doc.toc?.visible && (
          <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] py-6 lg:block">
            <Toc toc={doc.toc.content} />
          </aside>
        )}
      </div>
    </>
  );
}
