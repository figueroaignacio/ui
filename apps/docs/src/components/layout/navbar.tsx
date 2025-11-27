// Hooks
import { useTranslations } from 'next-intl';

// Components
import { Link } from '@/i18n/navigation';
import { Logo } from '../common/logo';
import { HeaderActions } from './header-actions';

export function Navbar() {
  const t = useTranslations('ui');
  const navigation: { title: string; url: string }[] = t.raw('navigation');

  return (
    <div className="relative z-50 hidden w-full items-center justify-between px-6 lg:flex">
      <div className="flex items-center justify-between gap-x-3">
        <div className="border-border border-r py-3 pr-34">
          <Logo />
        </div>
        <nav className="space-x-3">
          {navigation.map((item) => (
            <Link
              className="hover:text-primary text-muted-foreground text-sm hover:underline"
              href={item.url}
              key={item.url}
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
