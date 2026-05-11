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
    <header className="border-border bg-background/30 mb-2 flex items-center justify-between border-b px-6 py-3.5 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <AiAvatar size="sm" />
        <h2 className="from-foreground to-foreground/60 bg-linear-to-br bg-clip-text text-[15px] font-semibold tracking-tight text-transparent">
          Mate
        </h2>
      </div>
      <div className="flex items-center gap-2">
        {onReset && (
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                onClick={onReset}
                size="icon"
                variant="ghost"
                className="h-8 w-8 rounded-full transition-all"
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
