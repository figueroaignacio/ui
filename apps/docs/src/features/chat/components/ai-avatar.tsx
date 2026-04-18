const SIZES = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
} as const;

type AiAvatarProps = {
  size?: keyof typeof SIZES;
};

export function AiAvatar({ size = 'md' }: AiAvatarProps) {
  const SIZE = SIZES[size];

  return (
    <svg height={SIZE} viewBox="0 0 24 24" width={SIZE} xmlns="http://www.w3.org/2000/svg">
      <title>NachUI Agent</title>
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        fill="currentColor"
        d="M11 0h2v3h-2ZM3 3h18v15H3ZM1 6h2v8H1Zm20 0h2v8h-2ZM6 7h4v4H6Zm8 0h4v4h-4ZM3 18h4v2H3Zm6 0h2v2H9Zm4 0h2v2h-2Zm4 0h4v2h-4ZM5 20h3v2H5Zm11 0h3v2h-3Z"
      />
      <rect
        x="6"
        y="8"
        width="12"
        height="3"
        fill="currentColor"
        className="animate-blink origin-center"
      />
    </svg>
  );
}
