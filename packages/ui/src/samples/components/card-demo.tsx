import { Button } from '../../components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/card';

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm shadow-lg transition-shadow duration-300 hover:shadow-xl">
      <CardHeader>
        <CardTitle>Boost Your Productivity</CardTitle>
        <CardDescription>
          Learn the best techniques to manage your time and code smarter, not harder.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-muted-foreground text-sm">
        <p>
          Discover tips, tools, and tricks that help developers stay focused and efficient. From
          keyboard shortcuts to workflow optimizations, elevate your coding game.
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="secondary">Learn More</Button>
        <Button variant="ghost">Subscribe</Button>
      </CardFooter>
    </Card>
  );
}
