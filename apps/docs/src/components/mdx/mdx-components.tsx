// Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/ui/components/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/tabs';
import { Blockquote } from './blockquote';
import { CodeBlockWrapper } from './code-block-wrapper';
import { ComponentPreview } from './component-preview';
import { ComponentSource } from './component-source';
import { ComponentsList } from './components-list';
import { H1, H2, H3, H4, H5, H6 } from './heading';
import { Image } from './image';
import { InlineCode } from './inline-code';
import { PackageManagerTabs } from './package-manager-tabs';
import { Table, TableCell, TableHeader, TableRow } from './table';
import {
  HorizontalRule,
  Link,
  ListItem,
  OrderedList,
  Paragraph,
  Pre,
  UnorderedList,
} from './typography';

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
  table: Table,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  CodeBlockWrapper,
  Tabs,
  TabsContent,
  TabsTrigger,
  TabsList,
  ComponentPreview,
  ComponentsList,
  ComponentSource,
  PackageManagerTabs,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
};
