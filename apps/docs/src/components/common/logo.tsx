import { Link } from '@/i18n/navigation';

const SIZES = {
  sm: 'size-6',
  md: 'size-8',
  lg: 'size-10',
};

interface LogoProps {
  size?: keyof typeof SIZES;
  showText?: boolean;
}

export function Logo({ size = 'md', showText = false }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-x-2">
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={SIZES[size]}
      >
        <rect width="80" height="80" rx="16" fill="var(--foreground)" />
        <rect x="38" y="4" width="4" height="20" rx="2" fill="var(--background)" />
        <circle cx="40" cy="22" r="5" fill="var(--background)" />
        <rect x="16" y="22" width="48" height="8" rx="4" fill="var(--background)" />
        <path d="M18 30 C18 30 14 70 40 70 C66 70 62 30 62 30 Z" fill="var(--background)" />
      </svg>
      {showText && <span className="">NachUI</span>}
    </Link>
  );
}
