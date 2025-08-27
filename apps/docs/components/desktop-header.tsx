// Components
import { HeaderActions } from './header-actions';
import { Logo } from './logo';

export function DesktopHeader() {
  return (
    <div className="border-border relative z-50 hidden w-full items-center justify-between border-b px-5 py-3 lg:flex lg:px-16">
      <div>
        <Logo />
      </div>
      <HeaderActions />
    </div>
  );
}
