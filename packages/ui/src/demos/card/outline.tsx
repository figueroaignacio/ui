'use client';

import { Card } from '../../components/card';

export function Outline() {
  return (
    <Card variant="outline" className="w-[350px]">
      <Card.Header>
        <Card.Title>Outline Card</Card.Title>
        <Card.Description>Clean and defined with a bold border</Card.Description>
      </Card.Header>
      <Card.Content>
        <p>Outline cards work great for forms, settings, and structured content.</p>
      </Card.Content>
    </Card>
  );
}
