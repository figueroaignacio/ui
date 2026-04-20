import { Cancel01Icon, ChatAdd01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import { Tooltip } from '@repo/ui/components/tooltip';
import { useTranslations } from 'next-intl';
import { AiAvatar } from './ai-avatar';

interface ChatHeaderProps {
  onClose?: () => void;
  onReset?: () => void;
}

export function ChatHeader({ onClose, onReset }: ChatHeaderProps) {
  const t = useTranslations('components.chat.header');

  if (!onClose) return null;

  return (
    <header className="mb-4 flex items-center justify-between px-6 py-4">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        <AiAvatar size="sm" />
        <h2 className="text-sm font-medium tracking-wide">AI Assistant</h2>
      </div>
      <div className="flex items-center gap-2">
        {onReset && (
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                onClick={onReset}
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground h-8 w-8 rounded-full transition-all"
                aria-label="Reset chat"
                title="Reset chat"
              >
                <HugeiconsIcon icon={ChatAdd01Icon} size={18} />
              </Button>
            </Tooltip.Trigger>
            <Tooltip.Content side="bottom">
              <p>{t('reset')}</p>
            </Tooltip.Content>
          </Tooltip>
        )}
        <Button
          onClick={onClose}
          size="icon"
          variant="ghost"
          className="h-8 w-8 rounded-full transition-all"
          aria-label="Close chat"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={18} />
        </Button>
      </div>
    </header>
  );
}
