import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

type ShowcaseParams = {
  params: { component: string };
};

const demos: Record<string, React.ComponentType> = {
  button: dynamic(() => import('@repo/ui/components/button')),
  card: dynamic(() => import('@repo/ui/components/card')),
  tabs: dynamic(() => import('@repo/ui/components/tabs')),
};

export default function ShowcasePage({ params }: ShowcaseParams) {
  const Demo = demos[params.component];

  if (!Demo) return notFound();

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <h1 className="text-foreground text-3xl font-bold capitalize">
          {params.component} Showcase
        </h1>
        <Demo />
      </div>
    </div>
  );
}
