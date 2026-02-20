import { Link } from '@/i18n/navigation';

export function Logo({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <Link href="/" className="flex h-10 w-10 items-center overflow-hidden" suppressHydrationWarning>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect width="32" height="32" rx="8" className="fill-foreground" />
        <rect
          x="10"
          y="6"
          width="16"
          height="11"
          rx="3"
          className="fill-background"
          opacity="0.2"
        />
        <rect
          x="7"
          y="9"
          width="16"
          height="11"
          rx="3"
          className="fill-background"
          opacity="0.45"
        />
        <rect x="4" y="12" width="16" height="13" rx="3" className="fill-background" />
        <path
          d="M7.5 23V14L13.5 22V14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-foreground"
        />
      </svg>
    </Link>
  );
}
