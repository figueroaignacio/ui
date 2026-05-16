'use client';

import { Searcher } from '@/features/docs/components/searcher';
import { Link, usePathname } from '@/i18n/navigation';
import type { Navigation } from '@/lib/definitions';
import { cn } from '@repo/ui/lib/cn';
import { useTranslations } from 'next-intl';
import { Logo } from '../common/logo';

export function Navbar() {
  const t = useTranslations('ui');
  const navigation: Navigation[] = t.raw('navigation');
  const pathname = usePathname();

  return (
    <div className="relative z-50 container mx-auto hidden w-full items-center justify-between px-4 py-3 lg:flex">
      <div className="flex items-center justify-between gap-x-6">
        <Logo size="sm" />
        <nav className="flex items-center space-x-6 text-sm font-medium">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                className={cn(
                  'focus-visible:ring-foreground focus-visible:ring-offset-background rounded-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80',
                )}
                href={item.href}
                key={item.href}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex items-center gap-x-3">
        <Searcher />
      </div>
    </div>
  );
}
