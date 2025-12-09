import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/card';

export function CardGhostDemo() {
  return (
    <Card variant="ghost" className="w-[350px]">
      <CardHeader>
        <CardTitle>Ghost Card</CardTitle>
        <CardDescription>Subtle and unobtrusive</CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          Ghost cards are perfect for minimalist designs where you want grouping without visual
          weight.
        </p>
      </CardContent>
    </Card>
  );
}
