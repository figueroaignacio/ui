// Hooks
import { useTranslations } from 'next-intl';

// Components
import { Link } from '@/i18n/navigation';
import { Logo } from '../common/logo';
import { HeaderActions } from './header-actions';

// Types
import { Searcher } from '@/features/docs/components/searcher';
import type { Navigation } from '@/lib/definitions';

export function Navbar() {
  const t = useTranslations('ui');
  const navigation: Navigation[] = t.raw('navigation');

  return (
    <div className="relative z-50 hidden w-full items-center justify-between px-6 lg:flex">
      <div className="flex items-center justify-between gap-x-6">
        <div className="flex items-center justify-between space-x-1 py-3">
          <Logo />
        </div>
        <nav className="space-x-5">
          {navigation.map((item) => (
            <Link
              className="hover:text-primary text-muted-foreground text-sm"
              href={item.href}
              key={item.href}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="flex space-x-4">
        <Searcher />
        <HeaderActions />
      </div>
    </div>
  );
}
