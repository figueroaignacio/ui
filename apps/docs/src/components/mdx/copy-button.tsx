'use client';

// Hooks
import { useCopyToClipboard } from '@/features/docs/hooks/use-copy-to-clipboard';

// Components
import { CheckIcon, CopyIcon } from '@radix-ui/react-icons';
import { Button } from '@repo/ui/components/button';

interface CopyButtonProps {
  value: string;
  className?: string;
}

export function CopyButton({ value, className }: CopyButtonProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard(2000);

  return (
    <Button
      onClick={() => copyToClipboard(value)}
      disabled={isCopied}
      variant="ghost"
      size="icon"
      title={isCopied ? 'Copied!' : 'Copy code'}
    >
      {isCopied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
    </Button>
  );
}
