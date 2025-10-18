// Styles
import '@/css/code.css';

// Components
import { Blockquote } from './blockquote';
import { H1, H2, H3, H4, H5, H6 } from './heading';
import { Image } from './image';
import { Table, TableCell, TableHeader, TableRow } from './table';
import {
  Code,
  HorizontalRule,
  Link,
  ListItem,
  OrderedList,
  Paragraph,
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
  code: Code,
  hr: HorizontalRule,
  blockquote: Blockquote,
  img: Image,
  table: Table,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
};
