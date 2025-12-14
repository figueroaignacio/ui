'use client';

// Hooks
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// Components
import { Link } from '@/i18n/navigation';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

// Utils
import { getIcon } from '@/lib/get-icon';
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
      <nav className="hide-scrollbar sticky top-24 hidden h-[calc(100vh-5rem)] shrink-0 space-y-8 overflow-y-scroll mask-[linear-gradient(180deg,black_90%,transparent)] pb-10 lg:block">
        {docsNavigation.map((section: DocSection) => (
          <div key={section.title} className="space-y-3">
            <button
              onClick={() => toggleSection(section.title)}
              className="hover:text-foreground text-muted-foreground flex w-full items-center justify-between text-sm font-semibold transition-colors"
            >
              <div className="flex items-center gap-2">
                {getIcon(section.title)}
                {section.title}
              </div>
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  openSections.includes(section.title) && 'rotate-180',
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {openSections.includes(section.title) && (
                <motion.ul
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="ml-1.5 space-y-1 overflow-hidden border-l pl-3"
                >
                  {section.items.map((item: DocItem) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            'flex items-center gap-2 rounded-md px-3 py-2 text-xs transition-colors',
                            isActive
                              ? 'bg-secondary text-foreground font-medium'
                              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
                          )}
                        >
                          {getIcon(item.title, item.href)}
                          <span>{item.title}</span>
                        </Link>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </aside>
  );
}
