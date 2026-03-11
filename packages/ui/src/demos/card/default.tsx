'use client';

import { Button } from '../../components/button';
import { Card } from '../../components/card';

export function Default() {
  return (
    <Card className="w-full max-w-sm shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <Card.Header>
        <Card.Title>Boost Your Productivity</Card.Title>
        <Card.Description>
          Learn the best techniques to manage your time and code smarter, not harder.
        </Card.Description>
      </Card.Header>
      <Card.Content className="text-muted-foreground text-sm">
        <p>
          Discover tips, tools, and tricks that help developers stay focused and efficient. From
          keyboard shortcuts to workflow optimizations, elevate your coding game.
        </p>
      </Card.Content>
      <Card.Footer className="flex justify-end gap-2">
        <Button variant="secondary">Learn More</Button>
        <Button variant="ghost">Subscribe</Button>
      </Card.Footer>
    </Card>
  );
}
