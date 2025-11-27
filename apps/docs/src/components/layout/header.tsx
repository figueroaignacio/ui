// Components
import { MobileMenu } from './mobile-menu';
import { Navbar } from './navbar';

export function Header() {
  return (
    <header className="border-border sticky top-0 z-100 border-b backdrop-blur-lg">
      <Navbar />
      <MobileMenu />
    </header>
  );
}
