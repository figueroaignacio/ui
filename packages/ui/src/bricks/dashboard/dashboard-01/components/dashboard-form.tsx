'use client';

import { Badge } from '../../../../components/badge';
import { Button } from '../../../../components/button';
import { Card } from '../../../../components/card';
import { Progress } from '../../../../components/progress';
import { Table } from '../../../../components/table';

const INVOICES = [
  { id: 'INV-1024', customer: 'Acme Inc.', status: 'Paid', amount: '$1,240' },
  { id: 'INV-1023', customer: 'Nexa Studio', status: 'Pending', amount: '$320' },
  { id: 'INV-1022', customer: 'Orbit Labs', status: 'Overdue', amount: '$980' },
  { id: 'INV-1021', customer: 'Mono Works', status: 'Paid', amount: '$150' },
] as const;

function StatusBadge({ status }: { status: (typeof INVOICES)[number]['status'] }) {
  if (status === 'Paid') return <Badge>Paid</Badge>;
  if (status === 'Pending') return <Badge variant="secondary">Pending</Badge>;
  return <Badge variant="destructive">Overdue</Badge>;
}

export function Dashboard01() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-6xl space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-muted-foreground text-sm">Dashboard</p>
            <h2 className="text-foreground text-2xl font-extrabold tracking-tight">Overview</h2>
          </div>
          <Button size="sm">Create invoice</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <Card.Header>
              <Card.Title className="text-base">MRR</Card.Title>
              <Card.Description>Monthly recurring revenue</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-2">
                <div className="text-foreground text-3xl font-extrabold tracking-tight">
                  $18,420
                </div>
                <p className="text-muted-foreground text-xs">+12% vs last month</p>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title className="text-base">Active users</Card.Title>
              <Card.Description>Last 30 days</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-2">
                <div className="text-foreground text-3xl font-extrabold tracking-tight">6,912</div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Goal</span>
                    <span className="text-foreground font-medium">8,000</span>
                  </div>
                  <Progress value={86} />
                </div>
              </div>
            </Card.Content>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title className="text-base">Uptime</Card.Title>
              <Card.Description>Past 7 days</Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-2">
                <div className="text-foreground text-3xl font-extrabold tracking-tight">99.98%</div>
                <p className="text-muted-foreground text-xs">No incidents reported</p>
              </div>
            </Card.Content>
          </Card>
        </div>

        <Card>
          <Card.Header>
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <Card.Title className="text-base">Recent invoices</Card.Title>
                <Card.Description>Latest billing activity</Card.Description>
              </div>
              <Button variant="secondary" size="sm">
                Export
              </Button>
            </div>
          </Card.Header>
          <Card.Content>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.Head>Invoice</Table.Head>
                  <Table.Head>Customer</Table.Head>
                  <Table.Head>Status</Table.Head>
                  <Table.Head className="text-right">Amount</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {INVOICES.map((inv) => (
                  <Table.Row key={inv.id}>
                    <Table.Cell className="font-mono">{inv.id}</Table.Cell>
                    <Table.Cell>{inv.customer}</Table.Cell>
                    <Table.Cell>
                      <StatusBadge status={inv.status} />
                    </Table.Cell>
                    <Table.Cell className="text-right font-medium">{inv.amount}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}
