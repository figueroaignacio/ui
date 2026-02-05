import { Button } from '@repo/ui/components/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/ui/components/tooltip';
import { BotMessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatToggleButton({ isOpen, onClick }: ChatToggleButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [autoShow, setAutoShow] = useState(false);
  const t = useTranslations('components.chat.messages');

  useEffect(() => {
    const showTimer = setTimeout(() => setAutoShow(true), 1000);
    const hideTimer = setTimeout(() => setAutoShow(false), 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const shouldShowTooltip = (isHovered || autoShow) && !isOpen;

  return (
    <Tooltip open={shouldShowTooltip} onOpenChange={setIsHovered} delayDuration={0}>
      <TooltipTrigger asChild>
        <Button
          onClick={onClick}
          variant="outline"
          leftIcon={<BotMessageSquare className="size-4" />}
          className="relative z-50 shadow-lg"
        >
          NachUI Bot
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left" sideOffset={10}>
        {t('tooltip')}
      </TooltipContent>
    </Tooltip>
  );
}
