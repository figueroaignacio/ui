'use client';

// Hooks
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

// Components
import { Link } from '@/i18n/navigation';

// Utils
import { cn } from '@repo/ui/lib/cn';

// Definitions
import { DocItem, DocSection } from '@/lib/definitions';

export function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations('docs');
  const docsNavigation = t.raw('navigation');

  return (
    <aside className="hide-scrollbar sticky top-16 hidden h-[calc(100vh-5rem)] overflow-y-scroll lg:block">
      <nav>
        {docsNavigation.map((section: DocSection, index: number) => (
          <div key={section.title} className={cn('pb-4', index !== 0 && 'pt-4')}>
            <h2 className="text-muted-foreground py-2 text-sm tracking-tight">{section.title}</h2>
            <ul className="space-y-1">
              {section.items.map((item: DocItem) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`hover:bg-secondary animate-show-soft block w-fit rounded-xl px-4 py-2 text-xs transition-all duration-150 ${
                      pathname === item.href ? 'bg-secondary font-bold' : ''
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
