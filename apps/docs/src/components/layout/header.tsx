import { MobileMenu } from './mobile-menu';
import { Navbar } from './navbar';

export function Header() {
  return (
    <header className="border-border bg-background/50 sticky top-0 z-100 border-b backdrop-blur-md">
      <Navbar />
      <MobileMenu />
    </header>
  );
}
