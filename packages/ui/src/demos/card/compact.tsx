import { Button } from '../../components/button';
import { Card } from '../../components/card';

export function Compact() {
  return (
    <div className="grid gap-4">
      <Card className="w-full">
        <Card.Header>
          <Card.Title>Regular Spacing</Card.Title>
          <Card.Description>Default padding</Card.Description>
        </Card.Header>
        <Card.Content>
          <p>This card uses the default padding for comfortable spacing.</p>
        </Card.Content>
        <Card.Footer>
          <Button variant="secondary">Action</Button>
        </Card.Footer>
      </Card>
      <Card className="w-full">
        <Card.Header compact>
          <Card.Title>Compact Spacing</Card.Title>
          <Card.Description>Reduced padding</Card.Description>
        </Card.Header>
        <Card.Content compact>
          <p>This card uses compact padding for denser layouts.</p>
        </Card.Content>
        <Card.Footer compact>
          <Button variant="secondary">Action</Button>
        </Card.Footer>
      </Card>
    </div>
  );
}
