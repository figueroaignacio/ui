import { Delete02Icon, GlobalIcon, UserGroupIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Badge } from '@repo/ui/components/badge';
import { Card } from '@repo/ui/components/card';
import { Kbd } from '@repo/ui/components/kbd';
import { Label } from '@repo/ui/components/label';

export function PreviewProjectActions() {
  return (
    <Card variant="outline">
      <Card.Content compact className="flex flex-col gap-2 pt-5 pb-5">
        <Label className="mb-2 text-[10px] font-bold tracking-widest uppercase opacity-70">
          Project Actions
        </Label>

        <div className="group hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex size-8 items-center justify-center rounded-full">
              <HugeiconsIcon icon={UserGroupIcon} size={16} className="text-foreground" />
            </div>
            <div>
              <div className="text-foreground text-xs font-bold">Invite Team</div>
              <div className="text-muted-foreground text-[10px]">Add members</div>
            </div>
          </div>
          <Kbd>⌘I</Kbd>
        </div>

        <div className="group hover:bg-muted/50 flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex size-8 items-center justify-center rounded-full">
              <HugeiconsIcon icon={GlobalIcon} size={16} className="text-foreground" />
            </div>
            <div>
              <div className="text-foreground text-xs font-bold">Deployments</div>
              <div className="text-muted-foreground text-[10px]">Manage URLs</div>
            </div>
          </div>
          <Kbd>⌘D</Kbd>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 px-2">
          <Label className="text-destructive text-[10px] font-bold tracking-widest uppercase">
            Danger zone
          </Label>
          <Badge variant="destructive" className="h-4 px-1 text-[9px] font-bold">
            CRITICAL
          </Badge>
        </div>

        <div className="group hover:bg-destructive/10 flex cursor-pointer items-center justify-between rounded-lg p-2 transition-colors">
          <div className="flex items-center gap-3">
            <div className="bg-destructive/10 group-hover:bg-destructive/20 flex size-8 items-center justify-center rounded-full">
              <HugeiconsIcon icon={Delete02Icon} size={16} className="text-destructive" />
            </div>
            <div>
              <div className="text-destructive text-xs font-bold">Delete Project</div>
              <div className="text-destructive/70 text-[10px]">Irreversible action</div>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
