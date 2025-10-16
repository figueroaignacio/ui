'use client';

import { useTranslations } from 'next-intl';
import { CardLink } from './card-link';

type DocsNavigationItem = {
  href: string;
  title: string;
};

type DocsNavigationSection = {
  title: string;
  items: DocsNavigationItem[];
};

export function ComponentsList() {
  const t = useTranslations('ui');
  const docsNavigation = t.raw('docsNavigation') as DocsNavigationSection[];
  const componentsSection = docsNavigation.find(
    (section: DocsNavigationSection) =>
      section.items && section.items.some((item) => item.href?.includes('/docs/components')),
  );

  if (!componentsSection) {
    return <div>No components found</div>;
  }

  return (
    <div className="space-y-2">
      <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {componentsSection.items.map((component) => (
          <li key={component.href} className="animate-show">
            <CardLink href={component.href} label={component.title} />
          </li>
        ))}
      </ul>
    </div>
  );
}
