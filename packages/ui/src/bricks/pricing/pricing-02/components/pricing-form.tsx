'use client';

import { Badge } from '../../../../components/badge';
import { Button } from '../../../../components/button';
import { Card } from '../../../../components/card';
import { Tabs } from '../../../../components/tabs';
import { MONTHLY_ROWS, PricingComparisonTable, YEARLY_ROWS } from './pricing-02-table';

export function Pricing02() {
  return (
    <div className="w-full">
      <Card className="mx-auto w-full max-w-5xl">
        <Card.Header>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <Card.Title>Compare plans</Card.Title>
              <Card.Description>Switch billing cycles and pick what fits.</Card.Description>
            </div>
            <Button variant="outline" size="sm">
              View details
            </Button>
          </div>
        </Card.Header>
        <Card.Content>
          <Tabs defaultValue="monthly" variant="outline" className="space-y-4">
            <Tabs.List className="w-fit">
              <Tabs.Trigger value="monthly">Monthly</Tabs.Trigger>
              <Tabs.Trigger value="yearly">Yearly</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="monthly" className="mt-0">
              <PricingComparisonTable rows={MONTHLY_ROWS} />
            </Tabs.Content>
            <Tabs.Content value="yearly" className="mt-0">
              <div className="mb-3 flex items-center gap-2">
                <Badge variant="secondary">Save 20%</Badge>
                <p className="text-muted-foreground text-xs">Billed annually</p>
              </div>
              <PricingComparisonTable rows={YEARLY_ROWS} />
            </Tabs.Content>
          </Tabs>
        </Card.Content>
      </Card>
    </div>
  );
}
