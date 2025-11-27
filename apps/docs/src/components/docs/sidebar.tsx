'use client';

// Hooks
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// Components
import { Link } from '@/i18n/navigation';
import { ChevronDownIcon } from '@radix-ui/react-icons';

// Utils
import { cn } from '@repo/ui/lib/cn';

// Types
import type { DocItem, DocSection } from '@/lib/definitions';

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('docs');
  const docsNavigation = t.raw('navigation') as DocSection[];

  const [openSections, setOpenSections] = useState<string[]>(
    docsNavigation.map((section: DocSection) => section.title),
  );

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );
  };

  return (
    <aside className="border-border border-r pr-4">
      <nav className="hide-scrollbar sticky top-24 hidden h-[calc(100vh-5rem)] shrink-0 space-y-6 overflow-y-scroll lg:block">
        {docsNavigation.map((section: DocSection) => (
          <div key={section.title} className="space-y-2">
            <button
              onClick={() => toggleSection(section.title)}
              className="hover:text-foreground text-muted-foreground flex w-full items-center justify-between text-xs font-semibold transition-colors"
            >
              {section.title}
              <ChevronDownIcon
                className={cn(
                  'h-4 w-4 transition-transform',
                  openSections.includes(section.title) && 'rotate-180',
                )}
              />
            </button>
            {openSections.includes(section.title) && (
              <ul className="space-y-1 border-l pl-4">
                {section.items.map((item: DocItem) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`hover:bg-secondary animate-show-soft block rounded-xl px-2.5 py-2 text-xs transition-all duration-150 ${
                        pathname === item.href ? 'bg-secondary font-bold' : ''
                      }`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
