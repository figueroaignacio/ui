import { MobileMenu } from './mobile-menu';
import { Navbar } from './navbar';

export function Header() {
  return (
    <header className="bg-background sticky top-0 z-100 flex flex-col">
      <Navbar />
      <MobileMenu />
    </header>
  );
}
