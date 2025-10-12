'use client';

// Hooks
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

// Components
import { Link } from '@/i18n/navigation';

// Utils
import { cn } from '@/lib/utils';

// Definitions
import { DocItem, DocSection } from '@/lib/definitions';

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('ui');
  const docsNavigation = t.raw('docsNavigation');

  return (
    <aside className="hide-scrollbar sticky top-20 hidden h-[calc(100vh-5rem)] overflow-y-scroll pb-60 lg:block">
      <nav>
        {docsNavigation.map((section: DocSection, index: number) => (
          <div key={section.title} className={cn('pb-4', index !== 0 && 'pt-4')}>
            <h2 className="text-muted-foreground py-2 text-sm tracking-tight">{section.title}</h2>
            <ul className="space-y-1">
              {section.items.map((item: DocItem) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`hover:bg-accent animate-show-soft block w-fit rounded-xl px-2 py-2 text-xs transition-all duration-150 ${
                      pathname === item.href ? 'bg-accent font-bold' : ''
                    }`}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
