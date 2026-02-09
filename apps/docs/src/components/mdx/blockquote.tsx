import { Alert02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '@repo/ui/lib/cn';

export function Blockquote({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        '*:text-foreground/70 *:dark:text-muted-foreground flex gap-2 rounded-lg border p-2 text-sm',
        className,
      )}
      {...props}
    >
      <div className="mt-1 shrink-0">
        <HugeiconsIcon
          icon={Alert02Icon}
          className="fill-blue-500 stroke-zinc-100 dark:stroke-zinc-800"
        />
      </div>
      <div>{children}</div>
    </blockquote>
  );
}
