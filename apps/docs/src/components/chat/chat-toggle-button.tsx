// Components
import { Button } from '@repo/ui/components/button';
import { BotMessageSquare } from 'lucide-react';

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatToggleButton({ isOpen, onClick }: ChatToggleButtonProps) {
  return (
    <Button
      onClick={onClick}
      variant="secondary"
      leftIcon={<BotMessageSquare className="size-4" />}
    >
      Ask AI
    </Button>
  );
}
