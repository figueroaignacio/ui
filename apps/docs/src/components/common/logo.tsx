'use client';

import { Link } from '@/i18n/navigation';
import { useTheme } from 'i7a-themes';

export function Logo() {
  const { theme } = useTheme();

  return (
    <Link href="/" className="flex size-12 items-center">
      <img
        src={theme === 'dark' ? '/assets/logo-light.png' : '/assets/logo-dark.png'}
        className="size-12 object-contain"
        alt="NachUI"
      />
    </Link>
  );
}
