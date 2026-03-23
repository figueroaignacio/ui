import { Delete02Icon, GlobalIcon, UserGroupIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Card } from '@repo/ui/components/card';

export function PreviewProjectActions() {
  return (
    <Card variant="default">
      <Card.Content compact className="flex flex-col gap-2 pt-4">
        <div className="text-muted-foreground mb-2 text-xs font-medium">Project Actions</div>

        <div className="group hover:bg-secondary flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors">
          <div className="flex items-center gap-3">
            <HugeiconsIcon
              icon={UserGroupIcon}
              size={18}
              className="text-muted-foreground group-hover:text-foreground"
            />
            <div>
              <div className="text-foreground text-sm">Invite Team</div>
              <div className="text-muted-foreground text-xs">Add members</div>
            </div>
          </div>
          <div className="border-border text-muted-foreground rounded border px-1.5 py-0.5 text-xs">
            ⌘I
          </div>
        </div>

        <div className="group hover:bg-secondary flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors">
          <div className="flex items-center gap-3">
            <HugeiconsIcon
              icon={GlobalIcon}
              size={18}
              className="text-muted-foreground group-hover:text-foreground"
            />
            <div>
              <div className="text-foreground text-sm">Deployments</div>
              <div className="text-muted-foreground text-xs">Manage URLs</div>
            </div>
          </div>
          <div className="border-border text-muted-foreground rounded border px-1.5 py-0.5 text-xs">
            ⌘D
          </div>
        </div>

        <div className="text-destructive mt-2 mb-1 text-xs font-medium">Danger zone</div>
        <div className="group hover:bg-destructive/10 flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors">
          <div className="flex items-center gap-3">
            <HugeiconsIcon
              icon={Delete02Icon}
              size={18}
              className="text-destructive group-hover:text-destructive"
            />
            <div>
              <div className="text-destructive text-sm">Delete Project</div>
              <div className="text-destructive text-xs">Irreversible action</div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
