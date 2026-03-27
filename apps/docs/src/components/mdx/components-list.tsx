'use client';

import { useTranslations } from 'next-intl';
import { ComponentCard } from './component-card';

type DocsNavigationItem = {
  href: string;
  title: string;
  description: string;
};

type DocsNavigationSection = {
  title: string;
  items: DocsNavigationItem[];
};

export function ComponentsList() {
  const t = useTranslations('docs');
  const docsNavigation = t.raw('navigation') as DocsNavigationSection[];

  const componentsSection = docsNavigation.find(
    (section) => section.title === 'Componentes' || section.title === 'Components',
  );

  if (!componentsSection) {
    return <div>No components found</div>;
  }

  return (
    <div className="space-y-2">
      <ul className="sm mt-5 grid grid-cols-1 gap-6">
        {componentsSection.items.map((component: DocsNavigationItem) => (
          <li key={component.href} className="animate-show">
            <ComponentCard
              href={component.href}
              label={component.title}
              description={component.description}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
