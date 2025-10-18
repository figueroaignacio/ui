import { cn } from '@repo/ui/lib/cn';

export function Image({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn('rounded-xl border', className)} alt={alt} {...props} />
  );
}
