'use client';

import { useTranslations } from 'next-intl';
import { CardLink } from '../card-link';

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
      <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {componentsSection.items.map((component) => (
          <li key={component.href} className="animate-show">
            <CardLink
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
