// Components
import { Button } from '@repo/ui/components/button';
import { X } from 'lucide-react';

interface ChatHeaderProps {
  onClose?: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  if (!onClose) return null;

  return (
    <header className="flex justify-end px-2 py-3">
      <Button onClick={onClose} size="icon" variant="ghost" aria-label="Close chat">
        <X className="size-7" />
      </Button>
    </header>
  );
}
