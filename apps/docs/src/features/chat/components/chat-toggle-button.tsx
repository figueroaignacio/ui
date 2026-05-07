import { useKbdShortcut } from '@/hooks/use-kbd-shortcut';
import { Button } from '@repo/ui/components/button';
import { Tooltip } from '@repo/ui/components/tooltip';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatToggleButton({ isOpen, onClick }: ChatToggleButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [autoShow, setAutoShow] = useState(false);
  const t = useTranslations('components.chat');

  useEffect(() => {
    const showTimer = setTimeout(() => setAutoShow(true), 1000);
    const hideTimer = setTimeout(() => setAutoShow(false), 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  useKbdShortcut(['cmd', 'j'], onClick);

  const shouldShowTooltip = (isHovered || autoShow) && !isOpen;

  return (
    <Tooltip open={shouldShowTooltip} onOpenChange={setIsHovered} delayDuration={0}>
      <Tooltip.Trigger asChild>
        <Button onClick={onClick} variant="outline">
          {t('button.label')}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content side="top" sideOffset={10}>
        {t('messages.tooltip')}
      </Tooltip.Content>
    </Tooltip>
  );
}
