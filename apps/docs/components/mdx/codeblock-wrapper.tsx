'use client';

import * as React from 'react';

// Components
import { cn } from '@/lib/utils';
import { Button } from '@repo/ui/components/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/collapsible';

interface CodeBlockWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  expandButtonTitle?: string;
  language?: string;
  fileName?: string;
}

export function CodeBlockWrapper({
  expandButtonTitle = 'View Code',
  className,
  children,
  fileName,
  language,
  ...props
}: CodeBlockWrapperProps) {
  const [isOpened, setIsOpened] = React.useState(false);

  return (
    <Collapsible open={isOpened} onOpenChange={setIsOpened} className="mt-5">
      <div className="overflow-hidden rounded-md border">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-2 text-xs">
            {fileName && <span className="">{fileName}</span>}
            {language && <span className="">{language}</span>}
          </div>

          <CollapsibleTrigger asChild>
            <Button variant="link" size="sm" className="text-foreground text-xs">
              {isOpened ? 'Collapse' : expandButtonTitle}
            </Button>
          </CollapsibleTrigger>
        </div>

        <div className={cn('relative overflow-hidden', className)} {...props}>
          <CollapsibleContent forceMount className={cn('overflow-hidden', !isOpened && 'max-h-32')}>
            <div
              className={cn(
                '[&_[data-rehype-pretty-code-figure]]:my-0 [&_[data-rehype-pretty-code-figure]]:rounded-none [&_pre]:max-h-[650px] [&_pre]:rounded-none [&_pre]:pb-[100px]',
                !isOpened ? '[&_pre]:overflow-hidden' : '[&_pre]:overflow-auto',
              )}
            >
              {children}
            </div>
          </CollapsibleContent>
          {!isOpened && <div className="absolute inset-0" />}
        </div>
      </div>
    </Collapsible>
  );
}
