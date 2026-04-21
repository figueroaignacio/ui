import { Badge } from '@repo/ui/components/badge';
import { Card } from '@repo/ui/components/card';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Label } from '@repo/ui/components/label';

export function PreviewTasks() {
  return (
    <Card variant="outline">
      <Card.Content compact className="flex flex-col gap-5 pt-5 pb-5">
        <div className="flex items-center justify-between">
          <div className="text-foreground text-sm font-bold tracking-tight">Today's Tasks</div>
          <Badge variant="secondary" className="h-5 text-[10px] font-bold">
            2 PENDING
          </Badge>
        </div>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Checkbox id="task-1" defaultChecked />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="task-1"
                className="text-muted-foreground cursor-pointer text-xs font-medium line-through opacity-70"
              >
                Review PR #1043
              </Label>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id="task-2" />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="task-2"
                className="text-foreground cursor-pointer text-xs font-medium"
              >
                Update landing hero copy
              </Label>
              <p className="text-muted-foreground text-[10px]">Due in 2 hours</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Checkbox id="task-3" />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="task-3"
                className="text-foreground cursor-pointer text-xs font-medium"
              >
                Write release notes
              </Label>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
