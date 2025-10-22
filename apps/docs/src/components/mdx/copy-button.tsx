'use client';

// Hooks
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

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
      className={`text-muted-foreground hover:text-foreground transition-all ${className || ''}`}
      title={isCopied ? 'Copied!' : 'Copy code'}
    >
      {isCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
    </button>
  );
}
