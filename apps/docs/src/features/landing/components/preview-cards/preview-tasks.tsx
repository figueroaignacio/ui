import { Badge } from '@repo/ui/components/badge';
import { Card } from '@repo/ui/components/card';
import { Checkbox } from '@repo/ui/components/checkbox';

export function PreviewTasks() {
  return (
    <Card variant="outline">
      <Card.Content compact className="flex flex-col gap-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="text-foreground text-sm font-bold">Today's Tasks</div>
          <Badge variant="secondary">2 pending</Badge>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox id="task-1" defaultChecked />
            <div className="mt-0.5 grid gap-1.5 leading-none">
              <label
                htmlFor="task-1"
                className="text-muted-foreground cursor-pointer text-sm leading-none font-medium line-through"
              >
                Review PR #1043
              </label>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id="task-2" />
            <div className="mt-0.5 grid gap-1.5 leading-none">
              <label
                htmlFor="task-2"
                className="text-foreground cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Update landing hero copy
              </label>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id="task-3" />
            <div className="mt-0.5 grid gap-1.5 leading-none">
              <label
                htmlFor="task-3"
                className="text-foreground cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Write release notes
              </label>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
