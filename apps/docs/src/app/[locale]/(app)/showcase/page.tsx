'use client';

import { CardLink } from '@/components/card-link';
import { useTranslations } from 'next-intl';

const demoKeys = ['button', 'card', 'tabs'];

export default function ShowcasePage() {
  const t = useTranslations('showcase');

  const demos = demoKeys.map((key) => ({
    name: t(`demos.${key}.name`),
    description: t(`demos.${key}.description`),
    path: `/showcase/${key}`,
  }));

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header className="mb-12 text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight">{t('title')}</h1>
        <p className="text-muted-foreground text-lg">{t('subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {demos.map((demo) => (
          <CardLink
            key={demo.path}
            label={demo.name}
            href={demo.path}
            description={demo.description}
          />
        ))}
      </div>
    </main>
  );
}
