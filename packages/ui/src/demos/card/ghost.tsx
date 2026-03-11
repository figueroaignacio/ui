'use client';

import { Card } from '../../components/card';

export function Ghost() {
  return (
    <Card variant="ghost" className="w-[350px]">
      <Card.Header>
        <Card.Title>Ghost Card</Card.Title>
        <Card.Description>Subtle and unobtrusive</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>
          Ghost cards are perfect for minimalist designs where you want grouping without visual
          weight.
        </p>
      </Card.Content>
    </Card>
  );
}
