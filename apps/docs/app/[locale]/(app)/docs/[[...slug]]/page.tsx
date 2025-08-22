// Components
import { MDXContentRenderer } from '@/components/mdx/mdx-content-renderer';

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

  return <MDXContentRenderer code={doc.body} />;
}
