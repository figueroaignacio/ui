'use client';

import React from 'react';

interface StepProps {
  children: React.ReactNode;
  className?: string;
}

export const Step = ({ children, className = '' }: StepProps) => {
  return <div className={className}>{children}</div>;
};

Step.displayName = 'Step';

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export const Steps = ({ children, className = '' }: StepsProps) => {
  const steps = React.Children.toArray(children);

  return (
    <ol className={`mt-6 space-y-8 [counter-reset:step] ${className}`}>
      {steps.map((child, index) => {
        const isLast = index === steps.length - 1;

        return (
          <li
            key={index}
            className={`before:border-border before:text-muted-foreground relative pl-10 [counter-increment:step] before:absolute before:top-0 before:left-0 before:flex before:h-7 before:w-7 before:items-center before:justify-center before:rounded-full before:border before:text-sm before:font-medium before:content-[counter(step)] ${!isLast ? 'after:bg-border pb-8 after:absolute after:top-8 after:left-[13px] after:h-[calc(100%-2rem)] after:w-[1px]' : ''} `}
          >
            {child}
          </li>
        );
      })}
    </ol>
  );
};

Steps.displayName = 'Steps';
