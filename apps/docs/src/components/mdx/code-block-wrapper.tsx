'use client';

// Hooks
import { useTranslations } from 'next-intl';
import { cloneElement, useState } from 'react';

// Components
import { Button } from '@repo/ui/components/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CodeBlockProps {
  expandButton?: React.ReactNode;
  isExpanded?: boolean;
}

interface CodeBlockWrapperProps {
  children: React.ReactElement<CodeBlockProps>;
  expandButtonTitle?: string;
}

export function CodeBlockWrapper({
  children,
  expandButtonTitle = 'Expandir',
}: CodeBlockWrapperProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslations('components.codeblockWrapper');

  const expandButton = (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsExpanded((prev) => !prev)}
      className="h-8 gap-1 text-xs"
    >
      {isExpanded ? (
        <>
          <ChevronUp className="h-3 w-3" />
          {t('collapse')}
        </>
      ) : (
        <>
          <ChevronDown className="h-3 w-3" />
          {t('expand')}
        </>
      )}
    </Button>
  );

  return cloneElement(children, { expandButton, isExpanded });
}
