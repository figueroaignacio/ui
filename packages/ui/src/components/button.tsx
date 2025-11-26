import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import React, { forwardRef } from 'react';

const cn = (...inputs: any[]) => {
  return inputs.filter(Boolean).join(' ');
};

const buttonVariants = cva(
  [
    // Base styles
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium',
    'transition-all duration-300 ease-out',
    'outline-none select-none',
    'relative overflow-hidden',
    // Focus styles
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    // Disabled styles
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
    // SVG styles
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    '[&_svg:not([class*="size-"])]:size-4',
    '[&_svg]:transition-transform [&_svg]:duration-300',
    // Invalid state
    'aria-invalid:ring-2 aria-invalid:ring-destructive/50 aria-invalid:border-destructive',
    // Active state with bounce
    'active:scale-95',
    // Hover lift effect
    'hover:-translate-y-0.5',
    // Shine effect
    'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
    'before:translate-x-[-200%] hover:before:translate-x-[200%] before:transition-transform before:duration-700',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-secondary text-secondary-foreground shadow-md',
          'hover:bg-secondary/90 hover:shadow-xl hover:shadow-secondary/20',
          'active:shadow-sm',
        ].join(' '),
        destructive: [
          'bg-destructive text-destructive-foreground shadow-md',
          'hover:bg-destructive/90 hover:shadow-xl hover:shadow-destructive/20',
          'active:shadow-sm',
          'focus-visible:ring-destructive/50',
        ].join(' '),
        outline: [
          'border-2 border-input bg-transparent',
          'hover:bg-secondary hover:border-secondary hover:shadow-lg',
          'hover:scale-[1.02]',
        ].join(' '),
        secondary: [
          'bg-primary text-white shadow-md',
          'hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20',
          'active:shadow-sm',
        ].join(' '),
        ghost: ['hover:bg-secondary hover:shadow-md', 'hover:scale-105'].join(' '),
        link: [
          'text-primary underline-offset-4',
          'hover:underline hover:text-primary/80',
          'active:text-primary/60',
          'hover:scale-105',
        ].join(' '),
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-xs',
        lg: 'h-11 px-8 text-base',
        icon: 'size-9',
      },
      loading: {
        true: 'cursor-wait',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      loading: false,
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loader?: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  attached?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      loading = false,
      loader,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const LoaderComponent = loader ?? (
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        className={cn(buttonVariants({ variant, size, loading }), fullWidth && 'w-full', className)}
        aria-busy={loading}
        {...props}
      >
        {loading && LoaderComponent}
        {!loading && leftIcon && (
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:rotate-12"
          >
            {leftIcon}
          </span>
        )}
        <span className="relative z-10">{children}</span>
        {!loading && rightIcon && (
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-rotate-12"
          >
            {rightIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, orientation = 'horizontal', attached = false, ...props }, ref) => {
    const groupClassName = cn(
      'inline-flex',
      'transition-all duration-300',
      orientation === 'horizontal' ? 'flex-row' : 'flex-col',
      attached
        ? orientation === 'horizontal'
          ? '[&>button:not(:first-child)]:rounded-l-none [&>button:not(:last-child)]:rounded-r-none [&>button:not(:first-child)]:-ml-px'
          : '[&>button:not(:first-child)]:rounded-t-none [&>button:not(:last-child)]:rounded-b-none [&>button:not(:first-child)]:-mt-px'
        : orientation === 'horizontal'
          ? 'gap-2'
          : 'gap-2',
      className,
    );

    return (
      <div ref={ref} role="group" className={groupClassName} {...props}>
        {children}
      </div>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonGroup, buttonVariants };

export type { ButtonGroupProps, ButtonProps };
