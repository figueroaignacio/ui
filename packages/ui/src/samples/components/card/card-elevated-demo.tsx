import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/card';

export function CardElevatedDemo() {
  return (
    <Card variant="elevated" className="w-[350px]">
      <CardHeader>
        <CardTitle>Elevated Card</CardTitle>
        <CardDescription>This card stands out with a prominent shadow</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Use elevated cards to draw attention to important content or features.</p>
      </CardContent>
    </Card>
  );
}
