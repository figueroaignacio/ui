'use client';

import { motion } from 'motion/react';
import * as React from 'react';
import { cn } from '../lib/cn';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number | null;
  max?: number;
}

function Progress({
  className,
  value,
  max = 100,
  ref,
  ...props
}: ProgressProps & { ref?: React.Ref<HTMLDivElement> }) {
  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value ?? undefined}
      className={cn('bg-secondary relative h-2 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      {value === null || value === undefined ? (
        <motion.div
          className="bg-primary absolute inset-y-0 w-1/3 rounded-full"
          animate={{ left: ['-33%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        />
      ) : (
        <motion.div
          className="bg-primary h-full w-full flex-1"
          initial={{ x: '-100%' }}
          animate={{ x: `-${100 - (value / max) * 100}%` }}
          transition={{ type: 'spring', stiffness: 50, damping: 15 }}
        />
      )}
    </div>
  );
}
Progress.displayName = 'Progress';

export { Progress };
