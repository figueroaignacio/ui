import { BrickPreview } from '@/features/bricks/components/brick-preview';
import { BricksHero } from '@/features/bricks/components/bricks-hero';
import { BRICK_COMPONENTS } from '@/features/bricks/lib/brick-components';
import { getAllCategorySlugs, getBrickCategory } from '@/features/bricks/lib/bricks-registry';
import { getBrickSourceCode } from '@/features/bricks/lib/get-brick-source';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ locale: string; category: string }>;
};

export function generateStaticParams() {
  const slugs = getAllCategorySlugs();
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const brickCategory = getBrickCategory(category);

  if (!brickCategory) {
    return { title: 'Bricks' };
  }

  return {
    title: `${brickCategory.name} Bricks`,
    description: brickCategory.description,
  };
}

export default async function BricksCategoryPage({ params }: PageProps) {
  const { locale, category } = await params;
  setRequestLocale(locale);

  const brickCategory = getBrickCategory(category);

  if (!brickCategory) {
    notFound();
  }

  const bricksWithCode = await Promise.all(
    brickCategory.bricks.map(async (brick) => {
      const { files } = await getBrickSourceCode(category, brick.component);
      return { ...brick, files };
    }),
  );

  return (
    <div className="bg-background relative min-h-svh overflow-hidden pb-16">
      <BricksHero activeSlug={category} />

      <div className="mx-auto w-full max-w-7xl space-y-12 pt-8">
        {bricksWithCode.map((brick) => {
          const Component = BRICK_COMPONENTS[brick.component];

          if (!Component) {
            return null;
          }

          return (
            <BrickPreview
              key={brick.id}
              id={brick.id}
              name={brick.name}
              description={brick.description}
              files={brick.files}
            >
              <Component />
            </BrickPreview>
          );
        })}
      </div>
    </div>
  );
}
