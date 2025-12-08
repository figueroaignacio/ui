// Components
import { MobileMenu } from './mobile-menu';
import { Navbar } from './navbar';

export function Header() {
  return (
    <header className="border-border bg-background sticky top-0 z-100 border-b">
      <Navbar />
      <MobileMenu />
    </header>
  );
}
