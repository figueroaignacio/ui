import { Link } from '@/i18n/navigation';

const SIZES = {
  sm: 'size-5',
  md: 'size-10',
  lg: 'size-16',
};

export function Logo({ size = 'md' }: { size?: keyof typeof SIZES }) {
  return (
    <Link href="/" className={`flex items-center`}>
      <svg
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        className={SIZES[size]}
      >
        <rect width="80" height="80" rx="16" style={{ fill: 'var(--foreground)' }} />
        <rect x="8" y="8" width="28" height="64" rx="8" style={{ fill: 'var(--background)' }} />
        <rect
          x="44"
          y="8"
          width="28"
          height="44"
          rx="8"
          style={{ fill: 'var(--background)', opacity: 0.5 }}
        />
      </svg>
    </Link>
  );
}
