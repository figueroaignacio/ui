import { Link } from '@/i18n/navigation';

export function Logo() {
  return (
    <Link href="/" className="flex size-12 items-center" suppressHydrationWarning>
      <img
        src="/assets/logo-dark.png"
        className="size-12 object-contain dark:hidden"
        alt="NachUI"
        suppressHydrationWarning
      />
      <img
        src="/assets/logo-light.png"
        className="hidden size-12 object-contain dark:block"
        alt="NachUI"
        suppressHydrationWarning
      />
    </Link>
  );
}
