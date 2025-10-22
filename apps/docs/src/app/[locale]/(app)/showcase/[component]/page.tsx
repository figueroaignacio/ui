import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

interface ShowcasePageProps {
  params: Promise<{
    component: string;
  }>;
}

export async function generateStaticParams() {
  return [{ component: 'button' }, { component: 'card' }, { component: 'tabs' }];
}

const demos: Record<string, React.ComponentType> = {
  button: dynamic(() => import('@repo/ui/components/button')),
  card: dynamic(() => import('@repo/ui/components/card')),
  tabs: dynamic(() => import('@repo/ui/components/tabs')),
  collapsible: dynamic(() => import('@repo/ui/components/collapsible')),
};

export default async function ComponentShowcasePage({ params }: ShowcasePageProps) {
  const Demo = demos[(await params).component.toLowerCase()];

  if (!Demo) return notFound();

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <h1 className="text-foreground text-3xl font-bold capitalize">
          {(await params).component} Showcase
        </h1>
        <Demo />
      </div>
    </div>
  );
}
