import { cn } from '@/lib/utils';
import type React from 'react';

interface ComponentPreviewProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function ComponentPreview({ children, className, title }: ComponentPreviewProps) {
  return (
    <div className="my-6 w-full overflow-hidden rounded-lg border">
      <div className="flex items-center border-b bg-gradient-to-b px-3 py-2">
        <div className="mr-4 flex space-x-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        {title ?? (
          <div className="flex-1 truncate rounded-md px-3 py-1 text-center text-xs text-slate-600">
            {title}
          </div>
        )}
      </div>

      <div
        className={cn(
          'relative flex h-auto min-h-[40svh] items-center justify-center overflow-hidden p-6 md:p-10',
          className,
        )}
      >
        <div>{children}</div>
      </div>
    </div>
  );
}
