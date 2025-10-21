import { Showcase } from '@/components/showcase';
import { setRequestLocale } from 'next-intl/server';

type PageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export default async function ShowcasePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Showcase />
    </>
  );
}
