import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';

interface ChatHeaderProps {
  onClose?: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  if (!onClose) return null;

  return (
    <header className="mb-4 flex items-center justify-between border-b border-white/5 px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <h2 className="text-sm font-medium tracking-wide text-white">AI Assistant</h2>
      </div>
      <Button
        onClick={onClose}
        size="icon"
        variant="ghost"
        className="h-8 w-8 rounded-full text-white/60 transition-all hover:bg-white/10 hover:text-white"
        aria-label="Close chat"
      >
        <HugeiconsIcon icon={Cancel01Icon} size={18} />
      </Button>
    </header>
  );
}
