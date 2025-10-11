import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { cn } from '../lib/cn.js';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:animate-pulse-light active:animate-rubberBand active:scale-95",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary/90 hover:translate-y-[-1px] active:shadow-inner active:translate-y-[1px]',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 hover:shadow-md hover:translate-y-[-1px] active:shadow-inner active:translate-y-[1px] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:translate-y-[-1px] active:shadow-inner active:translate-y-[1px]',
        secondary:
          'bg-secondary text-muted-secondary rounded-xl hover:bg-secondary/80 hover:translate-y-[-1px] active:shadow-inner active:translate-y-[1px]',
        ghost:
          'hover:bg-accent hover:text-accent-foreground hover:translate-y-[-1px] active:shadow-inner active:translate-y-[1px]',
        link: 'text-primary underline-offset-4 hover:underline hover:animate-pulse active:animate-heartBeat',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-xl gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-xl px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('inline-flex items-center gap-1', className)} {...props}>
        {children}
      </div>
    );
  },
);

ButtonGroup.displayName = 'ButtonGroup';

export { ButtonGroup };
