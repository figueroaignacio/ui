import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/card';

export function Outline() {
  return (
    <Card variant="outline" className="w-[350px]">
      <CardHeader>
        <CardTitle>Outline Card</CardTitle>
        <CardDescription>Clean and defined with a bold border</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Outline cards work great for forms, settings, and structured content.</p>
      </CardContent>
    </Card>
  );
}
