'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import React, { forwardRef, useCallback } from 'react';
import { cn } from '../lib/cn';

const buttonVariants = cva(
  [
    // Base styles
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium',
    'transition-all duration-200 ease-in-out',
    'outline-none select-none',
    // Focus styles
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    // Disabled styles
    'disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed',
    // SVG styles
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    '[&_svg:not([class*="size-"])]:size-4',
    // Invalid state
    'aria-invalid:ring-2 aria-invalid:ring-destructive/50 aria-invalid:border-destructive',
    // Active state
    'active:scale-[0.95]',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-secondary text-secondary-foreground shadow-sm',
          'hover:bg-secondary/80 hover:shadow-md',
          'active:shadow-sm',
        ].join(' '),
        destructive: [
          'bg-destructive text-destructive-foreground shadow-sm',
          'hover:bg-destructive/90 hover:shadow-md',
          'active:shadow-sm',
          'focus-visible:ring-destructive/50',
        ].join(' '),
        outline: [
          'border border-input bg-transparent',
          'hover:bg-secondary hover:border-secondary',
        ].join(' '),
        secondary: [
          'bg-primary text-white shadow-sm',
          'hover:bg-primary/90 hover:shadow-md',
          'active:shadow-sm',
        ].join(' '),
        ghost: ['hover:bg-secondary'].join(' '),
        link: ['text-primary underline-offset-4', 'hover:underline', 'active:text-primary/80'].join(
          ' ',
        ),
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
  onClickAsync?: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
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
      onClick,
      onClickAsync,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const [isAsyncLoading, setIsAsyncLoading] = React.useState(false);
    const isLoading = loading || isAsyncLoading;
    const isDisabled = disabled || isLoading;

    const handleClick = useCallback(
      async (event: React.MouseEvent<HTMLButtonElement>) => {
        if (onClickAsync) {
          setIsAsyncLoading(true);
          try {
            await onClickAsync(event);
          } catch (error) {
            console.error('Button async click error:', error);
          } finally {
            setIsAsyncLoading(false);
          }
        } else {
          onClick?.(event);
        }
      },
      [onClick, onClickAsync],
    );

    const LoaderComponent = loader ?? (
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        onClick={handleClick}
        className={cn(
          buttonVariants({ variant, size, loading: isLoading }),
          fullWidth && 'w-full',
          className,
        )}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && LoaderComponent}
        {!isLoading && leftIcon && <span aria-hidden="true">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
      </button>
    );
  },
);

Button.displayName = 'Button';

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, orientation = 'horizontal', attached = false, ...props }, ref) => {
    const groupClassName = cn(
      'inline-flex',
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
