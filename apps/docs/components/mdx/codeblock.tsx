// Components
import { CopyButton } from './copy-button';

// Utils
import { cn } from '@/lib/utils';

export const CodeBlock = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) => {
  return (
    <div className="group relative rounded-xl font-mono text-sm">
      <div className="absolute top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <CopyButton>{children}</CopyButton>
      </div>
      <div className="w-full p-[2px]">
        <pre className={cn('overflow-x-auto rounded-xl font-mono', className)} {...props}>
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
};
