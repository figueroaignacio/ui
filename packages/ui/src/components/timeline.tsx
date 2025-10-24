'use client';

import * as React from 'react';
import { cn } from '../lib/cn';

interface TimelineContextValue {
  variant?: 'default' | 'compact' | 'detailed';
}

const TimelineContext = React.createContext<TimelineContextValue>({});

export function Timeline({
  className,
  children,
  variant = 'default',
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: 'default' | 'compact' | 'detailed';
}) {
  return (
    <TimelineContext.Provider value={{ variant }}>
      <div className={cn('relative space-y-8', className)}>{children}</div>
    </TimelineContext.Provider>
  );
}

export function TimelineItem({
  children,
  className,
  active,
  icon,
}: React.HTMLAttributes<HTMLDivElement> & {
  active?: boolean;
  icon?: React.ReactNode;
}) {
  const { variant } = React.useContext(TimelineContext);

  return (
    <div className={cn('group relative flex gap-6', className)}>
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            'relative z-10 flex size-4 items-center justify-center rounded-full border-2 transition-all duration-300',
            active ? 'border-primary bg-primary text-primary-foreground scale-110 shadow-lg' : '',
            variant === 'compact' && 'size-8',
            variant === 'detailed' && 'size-12',
          )}
        >
          {icon || (
            <div
              className={cn(
                'rounded-full transition-all',
                active ? 'bg-primary-foreground size-2' : 'bg-muted-foreground size-1.5',
              )}
            />
          )}
        </div>
        <div className="from-border mt-2 h-full w-px flex-1 bg-gradient-to-b to-transparent" />
      </div>
      <div className="flex-1 pb-8">
        <div className={cn('', active && 'border-primary/50')}>{children}</div>
      </div>
    </div>
  );
}

export function TimelineItemLast({
  children,
  className,
  active,
  icon,
}: React.HTMLAttributes<HTMLDivElement> & {
  active?: boolean;
  icon?: React.ReactNode;
}) {
  const { variant } = React.useContext(TimelineContext);

  return (
    <div className={cn('group relative flex gap-6', className)}>
      <div className="relative flex flex-col items-center">
        <div
          className={cn(
            'relative z-10 flex size-10 items-center justify-center rounded-full border-2 transition-all duration-300',
            active
              ? 'border-primary bg-primary text-primary-foreground shadow-primary/25 scale-110 shadow-lg'
              : 'border-border bg-background text-muted-foreground group-hover:border-primary/50 group-hover:scale-105',
            variant === 'compact' && 'size-8',
            variant === 'detailed' && 'size-12',
          )}
        >
          {icon || (
            <div
              className={cn(
                'rounded-full transition-all',
                active ? 'bg-primary-foreground size-2' : 'bg-muted-foreground size-1.5',
              )}
            />
          )}
        </div>
      </div>

      <div className="flex-1">
        <div
          className={cn(
            'bg-card rounded-lg border p-6 shadow-sm transition-all duration-300 group-hover:shadow-md',
            active && 'border-primary/50 shadow-md',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export function TimelineHeader({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-3 flex flex-col gap-1', className)}>{children}</div>;
}

export function TimelineTitle({ children, className }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-xl font-semibold tracking-tight', className)}>{children}</h3>;
}

export function TimelineDescription({
  children,
  className,
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-muted-foreground text-sm', className)}>{children}</p>;
}

export function TimelineMeta({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('text-muted-foreground flex flex-wrap items-center gap-2 text-xs', className)}
    >
      {children}
    </div>
  );
}

export function TimelineBadge({
  children,
  className,
  variant = 'default',
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: 'default' | 'primary' | 'success' | 'warning';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variant === 'default' && 'bg-secondary text-secondary-foreground',
        variant === 'primary' && 'bg-primary/10 text-primary',
        variant === 'success' && 'bg-green-500/10 text-green-700 dark:text-green-400',
        variant === 'warning' && 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function TimelineContent({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('text-muted-foreground mt-3 text-sm leading-relaxed', className)}>
      {children}
    </div>
  );
}

// Lista dentro del contenido
export function TimelineList({ children, className }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn('mt-2 space-y-1.5 text-sm', className)}>{children}</ul>;
}

export function TimelineListItem({ children, className }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn('flex items-start gap-2', className)}>
      <span className="bg-primary mt-1.5 size-1.5 shrink-0 rounded-full" />
      <span className="flex-1">{children}</span>
    </li>
  );
}
