'use client';

import { Searcher } from '@/features/docs/components/searcher';
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { Link, usePathname } from '@/i18n/navigation';
import type { DocSection, Navigation } from '@/lib/definitions';
import { getIcon } from '@/lib/get-icon';
import { Cancel01Icon, Menu06Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '@repo/ui/lib/cn';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { LocaleSwitcher } from '../common/locale-switcher';
import { Logo } from '../common/logo';
import { ThemeToggle } from '../common/theme-toggle';

export function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();

  const docsNavigation = t.raw('docs.navigation') as DocSection[];
  const navigation = t.raw('ui.navigation') as Navigation[];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useLockBodyScroll(isMenuOpen);

  return (
    <div className="relative flex w-full items-center justify-between px-5 py-5 lg:hidden">
      <button className="flex items-center gap-x-2 text-sm font-medium" onClick={toggleMenu}>
        <HugeiconsIcon icon={Menu06Icon} />
        Menu
      </button>
      <Searcher />
      <div
        className={cn(
          'bg-background/20 fixed inset-0 z-40 backdrop-blur-sm transition-opacity duration-300',
          isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={toggleMenu}
      />
      <nav
        className={cn(
          'bg-background fixed z-50 flex flex-col overflow-hidden rounded-lg border shadow-2xl transition-all duration-300',
          'inset-2 h-[calc(100svh-1rem)] sm:right-auto sm:w-[380px]',
          isMenuOpen ? 'translate-x-0' : 'translate-x-[calc(-90%-2rem)] opacity-0',
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
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {navigation && navigation.length > 0 && (
            <div className="mb-8">
              <h2 className="text-muted-foreground mb-3 text-xs font-bold tracking-widest uppercase">
                Menu
              </h2>
              <ul className="space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={item.href} onClick={toggleMenu}>
                      <Link
                        href={item.href}
                        className={cn(
                          'hover:bg-muted hover:text-primary flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium transition-colors',
                          isActive && 'text-foreground bg-muted',
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {getIcon(item.title, item.href)}
                          {item.title}
                        </div>
                        {isActive && <div className="bg-foreground size-1.5 rounded-full" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {docsNavigation.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-6 last:mb-0">
              <h2 className="text-foreground font-heading mb-3 flex items-center gap-2 text-sm font-bold tracking-tight">
                {getIcon(section.title)}
                {section.title}
              </h2>
              <ul className="ml-1.5 space-y-1 border-l pl-4">
                {section.items.map((item, itemIndex) => {
                  const isActive = pathname === item.href;

                  return (
                    <li key={itemIndex} onClick={toggleMenu}>
                      <Link
                        href={item.href}
                        className={cn(
                          'text-muted-foreground hover:bg-muted hover:text-primary flex items-center justify-between rounded-md px-2 py-1.5 text-xs transition-colors',
                          isActive && 'bg-muted text-foreground font-medium',
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {getIcon(item.title, item.href)}
                          {item.title}
                        </div>
                        {isActive && <div className="bg-foreground size-1.5 rounded-full" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
