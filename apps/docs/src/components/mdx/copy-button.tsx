'use client';

// Hooks
import { useCopyToClipboard } from '@/features/docs/hooks/use-copy-to-clipboard';

// Components
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';

interface CopyButtonProps {
  value: string;
  className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard(2000);

  return (
    <button
      onClick={() => copyToClipboard(value)}
      disabled={isCopied}
      title={isCopied ? 'Copied!' : 'Copy code'}
      className="transition-transform duration-100 hover:scale-[1.05] hover:cursor-pointer active:scale-[0.90]"
    >
      {isCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
    </button>
  );
}
