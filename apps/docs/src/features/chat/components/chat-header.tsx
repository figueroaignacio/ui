'use client';

import { Cancel01Icon, ChatAdd01Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import { Tooltip } from '@repo/ui/components/tooltip';
import { cn } from '@repo/ui/lib/cn';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiAvatar } from './ai-avatar';

interface ChatHeaderProps {
  onClose?: () => void;
  onReset?: () => void;
}

export function ChatHeader({ onClose, onReset }: ChatHeaderProps) {
  const t = useTranslations('components.chat.header');
  const [confirming, setConfirming] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearResetTimeout();
  }, [clearResetTimeout]);

  const handleResetClick = useCallback(() => {
    if (confirming) {
      clearResetTimeout();
      setConfirming(false);
      onReset?.();
    } else {
      setConfirming(true);
      timeoutRef.current = setTimeout(() => {
        setConfirming(false);
      }, 2500);
    }
  }, [confirming, clearResetTimeout, onReset]);

  if (!onClose) return null;

  return (
    <header className="bg-background/80 flex items-center justify-between px-6 py-3.5 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <AiAvatar size="sm" />
        <h2 className="text-foreground text-[15px] font-semibold tracking-tight">Mate</h2>
      </div>
      <div className="flex items-center gap-2">
        {onReset && (
          <Tooltip>
            <Tooltip.Trigger>
              <Button
                onClick={handleResetClick}
                size="icon"
                variant="ghost"
                className={cn(
                  'h-8 w-8 rounded-full transition-all duration-200',
                  confirming && 'bg-destructive/10 text-destructive hover:bg-destructive/20',
                )}
                aria-label={confirming ? 'Confirm reset' : 'Reset chat'}
              >
                <HugeiconsIcon
                  icon={confirming ? Tick02Icon : ChatAdd01Icon}
                  size={18}
                  className={cn('transition-transform duration-200', confirming && 'scale-110')}
                />
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
