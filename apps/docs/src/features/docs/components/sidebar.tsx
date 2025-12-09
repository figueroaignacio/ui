'use client';

// hOOKS
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// Components
import { Link } from '@/i18n/navigation';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { AnimatePresence, motion } from 'motion/react';

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
              className="hover:text-foreground text-muted-foreground flex w-full items-center justify-between text-xs font-semibold"
            >
              {section.title}
              <ChevronDownIcon
                className={cn(
                  'h-4 w-4 transition-transform',
                  openSections.includes(section.title) && 'rotate-180',
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {openSections.includes(section.title) && (
                <motion.ul
                  key="content"
                  initial={{ height: 0, opacity: 0, y: -6 }}
                  animate={{ height: 'auto', opacity: 1, y: 0 }}
                  exit={{ height: 0, opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="space-y-1 overflow-hidden border-l pl-4"
                >
                  {section.items.map((item: DocItem) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'hover:bg-secondary block rounded-xl px-2.5 py-2 text-xs',
                          pathname === item.href && 'bg-secondary font-bold',
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </aside>
  );
}
