// Hooks
import { useTranslations } from 'next-intl';

// Components
import { DesktopHeader } from './desktop-header';
import { MobileHeader } from './mobile-header';

export function Header() {
  const t = useTranslations();
  const navigation = t.raw('ui.navigation');
  const docsNavigation = t.raw('ui.docsNavigation');

  return (
    <header className="sticky top-0 left-0 z-50 mx-auto flex w-full items-center justify-between backdrop-blur-xl">
      <MobileHeader navigation={docsNavigation} />
      <DesktopHeader />
    </header>
  );
}
