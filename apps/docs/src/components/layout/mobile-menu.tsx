'use client';

// Hooks
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// Components
import { Searcher } from '@/features/docs/components/searcher';
import { Link } from '@/i18n/navigation';
import { ChevronRight, X } from 'lucide-react';
import { LocaleSwitcher } from '../common/locale-switcher';
import { Logo } from '../common/logo';
import { ThemeToggle } from '../common/theme-toggle';

// Utils
import { getIcon } from '@/lib/get-icon';
import { cn } from '@repo/ui/lib/cn';

// Definitions
import type { DocSection, Navigation } from '@/lib/definitions';

export function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();

  const docsNavigation = t.raw('docs.navigation') as DocSection[];
  const navigation = t.raw('ui.navigation') as Navigation[];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useLockBodyScroll(isMenuOpen);

  return (
    <div className="relative flex w-full items-center justify-between px-5 py-5 lg:hidden">
      <button className="flex items-center gap-x-2 text-sm font-medium" onClick={toggleMenu}>
        <ChevronRight className="h-6 w-6 cursor-pointer" />
        Menu
      </button>
      <Searcher />
      <nav
        className={cn(
          'bg-background/80 fixed inset-0 z-50 flex h-screen w-full flex-col pb-12 backdrop-blur-xl transition-transform duration-300',
          isMenuOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <button onClick={toggleMenu}>
            <Logo />
          </button>
          <div className="flex items-center gap-x-3">
            <LocaleSwitcher />
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="hover:bg-muted rounded-md p-2 transition-colors"
            >
              <X className="size-6 cursor-pointer" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto mask-[linear-gradient(180deg,black_90%,transparent)] px-6 py-6">
          {navigation && navigation.length > 0 && (
            <div className="mb-8">
              <h2 className="text-muted-foreground mb-3 text-xs font-bold tracking-widest uppercase">
                Menu
              </h2>
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.href} onClick={toggleMenu}>
                    <Link
                      href={item.href}
                      className="hover:bg-muted hover:text-primary flex items-center gap-2 rounded-md px-2 py-2 font-medium transition-colors"
                    >
                      {getIcon(item.title, item.href)}
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {docsNavigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6 last:mb-0">
              <h2 className="text-foreground mb-3 flex items-center gap-2 text-sm font-bold tracking-tight">
                {getIcon(section.title)}
                {section.title}
              </h2>
              <ul className="ml-1.5 space-y-1 border-l pl-4">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} onClick={toggleMenu}>
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:bg-muted hover:text-primary flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors"
                    >
                      {getIcon(item.title, item.href)}
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
