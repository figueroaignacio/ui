// Hooks
import { useTranslations } from 'next-intl';

// Components
import { Link } from '@/i18n/navigation';
import { HeaderActions } from './header-actions';
import { Logo } from './logo';

export function Navbar() {
  const t = useTranslations('ui');
  const navigation: { title: string; url: string }[] = t.raw('navigation');

  return (
    <div className="relative z-50 hidden w-full items-center justify-between px-5 py-3 lg:flex">
      <div className="flex items-center gap-x-3">
        <Logo />
        <nav className="space-x-3">
          {navigation.map((item) => (
            <Link
              className="hover:text-primary text-sm hover:underline"
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
