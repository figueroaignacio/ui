'use client';

import type { ReactNode } from 'react';

import { Badge } from '../../../../components/badge';
import { Table } from '../../../../components/table';

function Included() {
  return (
    <span aria-label="Included" className="text-primary inline-flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
  );
}

function NotIncluded() {
  return (
    <span aria-label="Not included" className="text-muted-foreground inline-flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    </span>
  );
}

export type PricingComparisonRow = {
  feature: string;
  starter: ReactNode;
  pro: ReactNode;
  enterprise: ReactNode;
};

export const MONTHLY_ROWS: PricingComparisonRow[] = [
  { feature: 'Components', starter: '10', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Bricks', starter: <NotIncluded />, pro: <Included />, enterprise: <Included /> },
  { feature: 'Team seats', starter: '1', pro: '5', enterprise: 'Unlimited' },
  { feature: 'SLA', starter: <NotIncluded />, pro: <NotIncluded />, enterprise: <Included /> },
];

export const YEARLY_ROWS: PricingComparisonRow[] = [
  { feature: 'Components', starter: '10', pro: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'Bricks', starter: <NotIncluded />, pro: <Included />, enterprise: <Included /> },
  { feature: 'Team seats', starter: '1', pro: '7', enterprise: 'Unlimited' },
  { feature: 'SLA', starter: <NotIncluded />, pro: <NotIncluded />, enterprise: <Included /> },
];

export function PricingComparisonTable({ rows }: { rows: PricingComparisonRow[] }) {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head className="w-[40%]">Feature</Table.Head>
          <Table.Head>Starter</Table.Head>
          <Table.Head>
            <div className="flex items-center gap-2">
              Pro <Badge variant="secondary">Best</Badge>
            </div>
          </Table.Head>
          <Table.Head>Enterprise</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {rows.map((row) => (
          <Table.Row key={row.feature}>
            <Table.Cell className="text-foreground font-medium">{row.feature}</Table.Cell>
            <Table.Cell>{row.starter}</Table.Cell>
            <Table.Cell>{row.pro}</Table.Cell>
            <Table.Cell>{row.enterprise}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
