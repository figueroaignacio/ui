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
            className={`
              relative pl-10 [counter-increment:step]
              before:content-[counter(step)]
              before:absolute before:left-0 before:top-0
              before:flex before:h-7 before:w-7
              before:items-center before:justify-center
              before:rounded-full before:border before:border-border
              before:text-sm before:font-medium before:text-muted-foreground
              ${!isLast ? 'pb-8 after:absolute after:left-[13px] after:top-8 after:h-[calc(100%-2rem)] after:w-[1px] after:bg-border' : ''}
            `}
          >
            {child}
          </li>
        );
      })}
    </ol>
  );
};

Steps.displayName = 'Steps';