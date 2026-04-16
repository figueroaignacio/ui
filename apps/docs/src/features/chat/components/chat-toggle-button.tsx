import { useKbdShortcut } from '@/hooks/use-kbd-shortcut';
import { Button } from '@repo/ui/components/button';
import { Kbd, KbdGroup } from '@repo/ui/components/kbd';
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
        <Button
          onClick={onClick}
          variant="outline"
          size="sm"
          rightIcon={
            <KbdGroup className="ml-2 hidden sm:flex">
              <Kbd size="sm">ctrl</Kbd>
              <span className="text-muted-foreground">+</span>
              <Kbd size="sm">J</Kbd>
            </KbdGroup>
          }
        >
          {t('button.label')}
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Content side="bottom" sideOffset={10}>
        {t('messages.tooltip')}
      </Tooltip.Content>
    </Tooltip>
  );
}
