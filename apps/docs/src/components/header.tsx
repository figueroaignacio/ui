// Components
import { MobileMenu } from './mobile-menu';
import { Navbar } from './navbar';

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg">
      <Navbar />
      <MobileMenu />
    </header>
  );
}
