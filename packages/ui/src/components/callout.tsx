import { cva, type VariantProps } from 'class-variance-authority';
import { AlertCircle, AlertTriangle, CheckCircle, Info } from 'lucide-react';
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
          return <Info size={18} />;
        case 'warning':
          return <AlertTriangle size={18} />;
        case 'danger':
          return <AlertCircle size={18} />;
        case 'success':
          return <CheckCircle size={18} />;
        default:
          return null;
      }
    };

    const calloutIcon = getIcon();

    return (
      <div ref={ref} className={cn(calloutVariants({ variant }), className)} {...props}>
        {calloutIcon && <div className="mt-0.5 shrink-0 text-base select-none">{calloutIcon}</div>}
        <div className="flex-1 space-y-1">
          {title && <div className="leading-none font-semibold tracking-tight">{title}</div>}
          <div className="text-muted-foreground/90 [&_p]:leading-relaxed">{children}</div>
        </div>
      </div>
    );
  },
);

Callout.displayName = 'Callout';

export { Callout, calloutVariants };
export type { CalloutProps };
