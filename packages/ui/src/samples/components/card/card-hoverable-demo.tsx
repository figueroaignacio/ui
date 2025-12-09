import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/card';

export function CardHoverableDemo() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <Card hoverable className="w-full">
        <CardHeader>
          <CardTitle>Interactive Card</CardTitle>
          <CardDescription>Hover to see the effect</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This card lifts up when you hover over it.</p>
        </CardContent>
      </Card>
      <Card hoverable variant="elevated" className="w-full">
        <CardHeader>
          <CardTitle>Elevated + Hover</CardTitle>
          <CardDescription>Combined effects</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Elevated cards with hover create a dramatic effect.</p>
        </CardContent>
      </Card>
      <Card hoverable variant="outline" className="w-full md:col-span-2">
        <CardHeader>
          <CardTitle>Outline + Hover</CardTitle>
          <CardDescription>Subtle interaction</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Outline cards provide clear boundaries.</p>
        </CardContent>
      </Card>
    </div>
  );
}
