import * as React from 'react';
import { cn } from '../lib/cn';

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Steps({ className, children, ...props }: StepsProps) {
  return (
    <div
      className={cn(
        'steps border-border mb-12 ml-4 border-l pl-6.5 [counter-reset:step]',
        // Targets nested headers (h3)
        '[&>h3]:step [&>h3]:before:bg-secondary-foreground [&>h3]:before:text-background [&>h3]:relative [&>h3]:mt-12! [&>h3]:mb-5 [&>h3]:[counter-increment:step] [&>h3]:before:absolute [&>h3]:before:-mt-[2px] [&>h3]:before:-ml-[41px] [&>h3]:before:flex [&>h3]:before:h-7 [&>h3]:before:w-7 [&>h3]:before:items-center [&>h3]:before:justify-center [&>h3]:before:rounded-full [&>h3]:before:text-center [&>h3]:before:text-[13px] [&>h3]:before:font-medium [&>h3]:before:content-[counter(step)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
