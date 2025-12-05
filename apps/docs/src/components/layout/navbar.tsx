// Hooks
import { useTranslations } from 'next-intl';

// Components
import { Link } from '@/i18n/navigation';
import { Logo } from '../common/logo';
import { HeaderActions } from './header-actions';

// Types
import type { Navigation } from '@/lib/definitions';

export function Navbar() {
  const t = useTranslations('ui');
  const navigation: Navigation[] = t.raw('navigation');

  return (
    <div className="relative z-50 hidden w-full items-center justify-between px-6 lg:flex">
      <div className="flex items-center justify-between gap-x-16">
        <div className="border-border flex items-center justify-between space-x-1 border-r py-3 pr-34">
          <Logo />
          <span className="border-primary bg-primary/20 rounded-lg border px-2 text-xs">Beta</span>
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
      <HeaderActions />
    </div>
  );
}
