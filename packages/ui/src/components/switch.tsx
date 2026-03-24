'use client';

import * as React from 'react';
import { cn } from '../lib/cn';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onCheckedChange?: (checked: boolean) => void;
}

function Switch({
  className,
  onCheckedChange,
  onChange,
  ref,
  ...props
}: SwitchProps & { ref?: React.Ref<HTMLInputElement> }) {
  return (
    <label
      className={cn(
        'focus-within:ring-ring focus-within:ring-offset-background relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-within:ring-2 focus-within:ring-offset-2 focus-within:outline-none has-disabled:cursor-not-allowed has-disabled:opacity-50',
        className,
      )}
    >
      <input
        type="checkbox"
        role="switch"
        ref={ref}
        className="peer sr-only"
        onChange={(e) => {
          onChange?.(e);
          onCheckedChange?.(e.target.checked);
        }}
        {...props}
      />
      <div className="bg-input peer-checked:bg-primary/60 pointer-events-none absolute inset-x-0 h-full w-full rounded-full transition-colors" />
      <span className="bg-secondary-foreground pointer-events-none z-10 block h-5 w-5 rounded-full shadow-sm ring-0 transition-transform peer-checked:translate-x-5" />
    </label>
  );
}
Switch.displayName = 'Switch';

export { Switch };
