import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import { AiAvatar } from './ai-avatar';

interface ChatHeaderProps {
  onClose?: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  if (!onClose) return null;

  return (
    <header className="mb-4 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <AiAvatar size="sm" />
        <h2 className="text-sm font-medium tracking-wide">AI Assistant</h2>
      </div>
      <Button
        onClick={onClose}
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full transition-all"
        aria-label="Close chat"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={18} />
      </Button>
    </header>
  );
}
