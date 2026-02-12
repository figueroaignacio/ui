import { Link } from '@/i18n/navigation';

export function Logo() {
  return (
    <Link href="/" className="flex h-10 w-10 items-center overflow-hidden" suppressHydrationWarning>
      <img
        src="/assets/logo-dark.png"
        className="h-14 w-14 object-cover dark:hidden"
        alt="NachUI"
        suppressHydrationWarning
      />
      <img
        src="/assets/logo-light.png"
        className="hidden h-14 w-14 object-cover dark:block"
        alt="NachUI"
        suppressHydrationWarning
      />
    </Link>
  );
}
