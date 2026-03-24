import { Accordion } from '@repo/ui/components/accordion';
import { Card } from '@repo/ui/components/card';

export function PreviewAccordion() {
  return (
    <Card variant="default">
      <Card.Content compact className="flex flex-col gap-2 pt-4">
        <div className="text-muted-foreground mb-2 text-xs font-medium">Common Questions</div>
        <Accordion type="single" defaultValue="item-1">
          <Accordion.Item value="item-1">
            <Accordion.Trigger value="item-1" className="py-2 text-xs">
              What is NachUI?
            </Accordion.Trigger>
            <Accordion.Content value="item-1" className="text-[11px]">
              A premium React component library built with Tailwind CSS v4 and Framer Motion.
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.Trigger value="item-2" className="py-2 text-xs">
              Is it responsive?
            </Accordion.Trigger>
            <Accordion.Content value="item-2" className="text-[11px]">
              Yes, every component is designed to work perfectly on any screen size.
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Card.Content>
    </Card>
  );
}
