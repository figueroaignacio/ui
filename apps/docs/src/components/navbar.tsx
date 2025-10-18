import { Logo } from './logo';

export function Navbar() {
  return (
    <div className="relative z-50 hidden w-full items-center justify-between px-5 py-3 lg:flex">
      <div>
        <Logo />
      </div>
    </div>
  );
}
