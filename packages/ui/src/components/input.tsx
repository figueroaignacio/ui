import * as React from 'react';
import { cn } from '../lib/cn';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
}

const InputWrapper = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { ref?: React.Ref<HTMLDivElement> }) => (
  <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...props} />
);
InputWrapper.displayName = 'InputWrapper';

const InputLabel = ({
  className,
  ref,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { ref?: React.Ref<HTMLLabelElement> }) => (
  <label ref={ref} className={cn('text-foreground text-sm font-medium', className)} {...props} />
);
InputLabel.displayName = 'InputLabel';

const InputError = ({
  className,
  ref,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { ref?: React.Ref<HTMLSpanElement> }) => (
  <span ref={ref} className={cn('text-destructive text-xs', className)} {...props} />
);
InputError.displayName = 'InputError';

const InputRoot = ({
  className,
  type,
  label,
  error,
  id,
  ref,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) => {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <InputWrapper>
      {label && <InputLabel htmlFor={inputId}>{label}</InputLabel>}
      <input
        ref={ref}
        id={inputId}
        type={type}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          error && 'border-destructive focus-visible:border-destructive',
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        {...props}
      />
      {error && <InputError id={errorId}>{error}</InputError>}
    </InputWrapper>
  );
};

InputRoot.displayName = 'Input';

const Input = Object.assign(InputRoot, {
  Wrapper: InputWrapper,
  Label: InputLabel,
  Error: InputError,
});

export { Input };
export type { InputProps };
