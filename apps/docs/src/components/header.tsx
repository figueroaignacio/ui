import { useTranslations } from 'next-intl';

// Components
import { MobileMenu } from './mobile-menu';
import { Navbar } from './navbar';

export function Header() {
  const t = useTranslations('ui');

  return (
    <>
      <Navbar />
      <MobileMenu />
    </>
  );
}
