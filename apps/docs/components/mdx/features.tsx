// Hooks
import { useTranslations } from 'next-intl';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export function Features() {
  const t = useTranslations('sections');
  const features = t.raw('features');

  return (
    <div className="mt-5 grid gap-6 md:grid-cols-2">
      {features.map((feature: { title: string; description: string }, index: number) => (
        <Card key={index} variant="ghost">
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{feature.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
