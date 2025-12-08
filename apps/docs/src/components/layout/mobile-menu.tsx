'use client';

// Hooks
import { useLockBodyScroll } from '@/hooks/use-lock-body-scroll';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

// Components
import { Link } from '@/i18n/navigation';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Logo } from '../common/logo';
import { HeaderActions } from './header-actions';

// Definitions
import type { DocSection, Navigation } from '@/lib/definitions';

export function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const docsNavigation = t.raw('docs.navigation') as DocSection[];
  const navigation = t.raw('ui.navigation') as Navigation[];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useLockBodyScroll(isMenuOpen);

  return (
    <div className="relative flex w-full items-center justify-between px-5 py-5 lg:hidden">
      <button className="flex gap-x-2" onClick={toggleMenu}>
        <HamburgerMenuIcon className="h-6 w-6 cursor-pointer" />
        menu
      </button>
      <nav
        className={`bg-background fixed inset-0 z-50 mb-12 flex h-screen w-full flex-col transition-all duration-300 ${
          isMenuOpen
            ? 'pointer-events-auto scale-100 opacity-100'
            : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={toggleMenu}>
            <Cross1Icon className="size-8 cursor-pointer" />
          </button>
          <button onClick={toggleMenu}>
            <Logo />
          </button>
        </div>
        <div className="mb-16 flex-1 space-y-6 overflow-y-auto px-5 py-4">
          <h2 className="text-muted-foreground animate-show-soft mb-2 text-sm font-semibold tracking-tight">
            Menu
          </h2>
          <ul>
            {navigation.map((item) => (
              <li onClick={toggleMenu} key={item.href}>
                <Link href={item.href} className="animate-show-soft block py-2 text-2xl font-bold">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          {docsNavigation.map((section, sectionIndex) => (
            <div key={`section-${sectionIndex}`} className={sectionIndex !== 0 ? 'pt-2' : ''}>
              <h2 className="text-muted-foreground animate-show-soft mb-2 text-sm font-semibold tracking-tight">
                {section.title}
              </h2>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li
                    key={`item-${sectionIndex}-${itemIndex}`}
                    className="mr-6"
                    onClick={toggleMenu}
                  >
                    <Link
                      href={item.href}
                      className="animate-show-soft block py-2 text-2xl font-bold"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
      <HeaderActions />
    </div>
  );
}
