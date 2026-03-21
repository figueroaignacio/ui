import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../lib/cn';
import { Label } from './label';

const textareaVariants = cva(
  'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
  {
    variants: {
      size: {
        sm: 'min-h-[60px] px-2.5 py-1.5 text-xs',
        default: 'min-h-[80px] px-3 py-2 text-base md:text-sm',
        lg: 'min-h-[120px] px-4 py-3 text-base',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

type TextareaSize = VariantProps<typeof textareaVariants>['size'];

interface TextareaProps extends Omit<React.ComponentProps<'textarea'>, 'size'> {
  ref?: React.Ref<HTMLTextAreaElement>;
  label?: string;
  error?: string;
  description?: string;
  size?: TextareaSize;
  autoResize?: boolean;
}

function Textarea({
  className,
  label,
  error,
  description,
  size,
  autoResize = false,
  id,
  ref,
  ...props
}: TextareaProps) {
  const generatedId = React.useId();
  const textareaId = id ?? generatedId;
  const errorId = `${textareaId}-error`;
  const descriptionId = `${textareaId}-description`;
  const internalRef = React.useRef<HTMLTextAreaElement | null>(null);

  const describedBy =
    [description ? descriptionId : undefined, error ? errorId : undefined]
      .filter(Boolean)
      .join(' ') || undefined;

  const handleAutoResize = React.useCallback(() => {
    const textarea = internalRef.current;
    if (textarea && autoResize) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [autoResize]);

  const setRefs = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      }
    },
    [ref],
  );

  return (
    <div className="flex flex-col gap-1.5">
      {label && <Label htmlFor={textareaId}>{label}</Label>}
      {description && (
        <span id={descriptionId} className="text-muted-foreground text-xs">
          {description}
        </span>
      )}
      <textarea
        ref={setRefs}
        id={textareaId}
        data-slot="textarea"
        className={cn(
          textareaVariants({ size }),
          autoResize && 'resize-none overflow-hidden',
          error && 'border-destructive focus-visible:border-destructive',
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        onInput={autoResize ? handleAutoResize : undefined}
        {...props}
      />
      {error && (
        <span id={errorId} className="text-destructive text-xs">
          {error}
        </span>
      )}
    </div>
  );
}

Textarea.displayName = 'Textarea';

export { Textarea, textareaVariants };
export type { TextareaProps };
