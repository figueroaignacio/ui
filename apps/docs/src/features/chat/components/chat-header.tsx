import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';

interface ChatHeaderProps {
  onClose?: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  if (!onClose) return null;

  return (
    <header className="flex justify-end">
      <Button onClick={onClose} size="icon" variant="ghost" aria-label="Close chat">
        <HugeiconsIcon icon={Cancel01Icon} size={20} />
      </Button>
    </header>
  );
}
