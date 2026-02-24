'use client';

import { useChatContext } from '@/features/chat/context/chat-context';
import { AiBeautifyIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import { useTranslations } from 'next-intl';

type ExplainButtonProps = {
  componentName: string;
  url: string;
};

export function ExplainButton({ componentName, url }: ExplainButtonProps) {
  const t = useTranslations('components.explainButton');
  const { triggerExplanation } = useChatContext();

  const handleClick = () => {
    const prompt = t('prompt', { component: componentName, url });
    triggerExplanation(componentName, prompt);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8 gap-2"
      onClick={handleClick}
      leftIcon={<HugeiconsIcon icon={AiBeautifyIcon} size={16} />}
    >
      <span>{t('label')}</span>
    </Button>
  );
}
