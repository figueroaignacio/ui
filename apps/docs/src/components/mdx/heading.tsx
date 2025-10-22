import { cn } from '@repo/ui/lib/cn';

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

const headingStyles = {
  h1: 'font-heading mt-2 scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
  h2: 'font-heading mt-12 scroll-m-20 border-b border-border pb-3 text-xl font-semibold tracking-tight transition-colors first:mt-0',
  h3: 'font-heading mt-10 scroll-m-20 text-2xl font-semibold tracking-tight',
  h4: 'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
  h6: 'font-heading mt-8 scroll-m-20 text-base font-semibold tracking-tight',
} as const;

function createHeading(Tag: keyof typeof headingStyles) {
  return ({ className, ...props }: HeadingProps) => (
    <Tag className={cn(headingStyles[Tag], className)} {...props} />
  );
}

export const H1 = createHeading('h1');
export const H2 = createHeading('h2');
export const H3 = createHeading('h3');
export const H4 = createHeading('h4');
export const H5 = createHeading('h5');
export const H6 = createHeading('h6');
