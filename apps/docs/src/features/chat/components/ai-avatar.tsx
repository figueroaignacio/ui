const SIZES = {
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
};

export function AiAvatar({ size = 'md' }: { size?: keyof typeof SIZES }) {
  const SIZE = SIZES[size];

  return (
    <svg height={SIZE} viewBox="0 0 24 24" width={SIZE} xmlns="http://www.w3.org/2000/svg">
      <title>NachUI Agent</title>
      <path
        clip-rule="evenodd"
        fill-rule="evenodd"
        fill="currentColor"
        d="M15 0h1.5v1H17v2h-1.5V2H15ZM2 3h20v15h-2v2h-1.5v2h-3v-2H8.5v2h-3v-2H4v-2H2ZM6 11h2V8H6Zm10 0h2V8h-2Z"
      />
    </svg>
  );
}
