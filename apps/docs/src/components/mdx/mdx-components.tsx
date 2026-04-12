import { Alert02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Callout } from '@repo/ui/components/callout';
import { Steps } from '@repo/ui/components/steps';
import { cn } from '@repo/ui/lib/cn';
import { isValidElement } from 'react';
import { CodeBlockWrapper } from './code-block-wrapper';
import { CodeBlock } from './codeblock';
import { ComponentInstallTabs } from './component-install-tabs';
import { ComponentPreview } from './component-preview';
import { ComponentSource } from './component-source';
import { ComponentsList } from './components-list';
import {
  MdxAccordion,
  MdxAccordionContent,
  MdxAccordionItem,
  MdxAccordionTrigger,
  MdxFile,
  MdxFiles,
  MdxFolder,
  MdxTable,
  MdxTableBody,
  MdxTableCell,
  MdxTableHead,
  MdxTableHeader,
  MdxTableRow,
  MdxTabs,
  MdxTabsContent,
  MdxTabsList,
  MdxTabsTrigger,
} from './compound-components';
import { InlineCode } from './inline-code';
import { PackageManagerTabs } from './package-manager-tabs';

const headingStyles = {
  h1: 'font-heading mt-2 scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl',
  h2: 'font-heading mt-12 scroll-m-20 text-xl md:text-2xl font-semibold tracking-tight first:mt-0 border-b border-border pb-2',
  h3: 'font-heading mt-12 mb-5 scroll-m-20 text-md font-semibold tracking-tight',
  h4: 'font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight',
  h5: 'font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight',
  h6: 'font-heading mt-8 scroll-m-20 text-base font-semibold tracking-tight',
} as const;

function createHeading(Tag: keyof typeof headingStyles) {
  return ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <Tag className={cn(headingStyles[Tag], className)} {...props} />
  );
}

const H1 = createHeading('h1');
const H2 = createHeading('h2');
const H3 = createHeading('h3');
const H4 = createHeading('h4');
const H5 = createHeading('h5');
const H6 = createHeading('h6');

function Paragraph({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('text-foreground/90 text-[15px] leading-[1.75]', 'not-first:mt-6', className)}
      {...props}
    />
  );
}

function Link({ className, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        'text-primary decoration-primary/30 font-medium underline underline-offset-4',
        'hover:decoration-primary/60 transition-colors duration-200',
        'focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

function UnorderedList({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      className={cn(
        'my-6 ml-6 list-disc space-y-2',
        'marker:text-muted-foreground [&>li]:pl-2',
        className,
      )}
      {...props}
    />
  );
}

function OrderedList({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      className={cn(
        'my-6 ml-6 list-decimal space-y-2',
        'marker:text-muted-foreground marker:font-medium [&>li]:pl-2',
        className,
      )}
      {...props}
    />
  );
}

function ListItem({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li className={cn('text-foreground/90 text-[15px] leading-[1.75]', className)} {...props} />
  );
}

function HorizontalRule({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn('border-border my-8 md:my-12', className)} {...props} />;
}

export function Pre({ children }: { children: React.ReactNode }) {
  if (!isValidElement(children)) {
    return <pre className="overflow-x-auto">{children}</pre>;
  }

  const childProps = children.props as { className?: string; children?: React.ReactNode };
  const language = childProps.className?.replace('language-', '') || 'tsx';

  const extractCode = (node: unknown): string => {
    if (!node) return '';
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(extractCode).join('');
    if (isValidElement(node)) {
      return extractCode((node.props as { children?: React.ReactNode }).children);
    }
    if (typeof node === 'object' && node !== null && 'value' in node) {
      return String((node as Record<string, unknown>).value);
    }
    return '';
  };
  const code = extractCode(childProps.children).trim();

  return (
    <div className="w-full overflow-x-auto">
      <CodeBlock code={code} language={language} className="min-w-0" />
    </div>
  );
}

function Blockquote({ className, children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) {
  return (
    <blockquote
      className={cn(
        '*:text-foreground/70 *:dark:text-muted-foreground flex gap-2 rounded-lg border p-2 text-sm',
        className,
      )}
      {...props}
    >
      <div className="mt-1 shrink-0">
        <HugeiconsIcon
          icon={Alert02Icon}
          className="fill-blue-500 stroke-zinc-100 dark:stroke-zinc-800"
        />
      </div>
      <div>{children}</div>
    </blockquote>
  );
}

function Image({ className, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img className={cn('rounded-xl border', className)} alt={alt} {...props} />;
}

export const mdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: Link,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  code: InlineCode,
  pre: Pre,
  hr: HorizontalRule,
  blockquote: Blockquote,
  img: Image,
  table: MdxTable,
  thead: MdxTableHeader,
  tbody: MdxTableBody,
  tr: MdxTableRow,
  th: MdxTableHead,
  td: MdxTableCell,
  CodeBlockWrapper,
  Tabs: MdxTabs,
  TabsContent: MdxTabsContent,
  TabsTrigger: MdxTabsTrigger,
  TabsList: MdxTabsList,
  ComponentInstallTabs,
  ComponentPreview,
  ComponentsList,
  ComponentSource,
  PackageManagerTabs,
  Accordion: MdxAccordion,
  AccordionContent: MdxAccordionContent,
  AccordionItem: MdxAccordionItem,
  AccordionTrigger: MdxAccordionTrigger,
  Callout,
  Files: MdxFiles,
  Folder: MdxFolder,
  File: MdxFile,
  Steps,
};
