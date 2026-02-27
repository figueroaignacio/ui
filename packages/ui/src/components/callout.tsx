import {
  Alert01Icon,
  Alert02Icon,
  CheckmarkCircle01Icon,
  InformationCircleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { forwardRef } from 'react';
import { cn } from '../lib/cn';

const calloutVariants = cva('flex w-full items-start gap-3 rounded-md border p-4 text-sm', {
  variants: {
    variant: {
      default: 'bg-card/50 text-card-foreground border-border',
      info: 'bg-info/10 text-info border-info/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      danger: 'bg-destructive/10 text-destructive border-destructive/20',
      success: 'bg-success/10 text-success border-success/20',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof calloutVariants> {
  icon?: React.ReactNode;
  title?: string;
}

const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant, icon, title, children, ...props }, ref) => {
    const getIcon = () => {
      if (icon) return icon;

      switch (variant) {
        case 'info':
          return <HugeiconsIcon icon={InformationCircleIcon} size={18} />;
        case 'warning':
          return <HugeiconsIcon icon={Alert02Icon} size={18} />;
        case 'danger':
          return <HugeiconsIcon icon={Alert01Icon} size={18} />;
        case 'success':
          return <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} />;
        default:
          return null;
      }
    };

    const calloutIcon = getIcon();

    return (
      <div ref={ref} className={cn(calloutVariants({ variant }), className)} {...props}>
        {calloutIcon ? (
          <div className="mt-0.5 shrink-0 text-base select-none">{calloutIcon}</div>
        ) : null}
        <div className="flex-1 space-y-1">
          {title ? <div className="leading-none font-semibold tracking-tight">{title}</div> : null}
          <div className="text-muted-foreground/90 [&_p]:leading-relaxed">{children}</div>
        </div>
      </div>
    );
  },
);

Callout.displayName = 'Callout';

export { Callout, calloutVariants };
export type { CalloutProps };
