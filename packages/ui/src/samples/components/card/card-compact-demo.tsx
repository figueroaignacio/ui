import { Button } from '../../../components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../components/card';

export function CardCompactDemo() {
  return (
    <div className="grid gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Regular Spacing</CardTitle>
          <CardDescription>Default padding</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card uses the default padding for comfortable spacing.</p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary">Action</Button>
        </CardFooter>
      </Card>
      <Card className="w-full">
        <CardHeader compact>
          <CardTitle>Compact Spacing</CardTitle>
          <CardDescription>Reduced padding</CardDescription>
        </CardHeader>
        <CardContent compact>
          <p>This card uses compact padding for denser layouts.</p>
        </CardContent>
        <CardFooter compact>
          <Button variant="secondary">Action</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
