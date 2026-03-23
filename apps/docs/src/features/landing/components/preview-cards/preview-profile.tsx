import { CheckmarkBadge01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Avatar } from '@repo/ui/components/avatar';
import { Card } from '@repo/ui/components/card';

export function PreviewProfile() {
  return (
    <Card variant="ghost">
      <Card.Content compact className="pt-4 pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar size="sm" className="border-border bg-foreground text-background border">
              <Avatar.Image src="https://github.com/figueroaignacio.png" />
            </Avatar>
            <div>
              <div className="text-foreground flex items-center gap-1 text-sm font-bold">
                Ignacio Figueroa
                <HugeiconsIcon icon={CheckmarkBadge01Icon} size={14} className="text-primary" />
              </div>
              <div className="text-muted-foreground text-xs">@nach_ui</div>
            </div>
          </div>
        </div>
        <div className="text-foreground mt-3 text-sm font-medium">
          Building for the future of UI and Frontend Development
        </div>
        <div className="mt-3 flex gap-4 text-xs">
          <div className="text-muted-foreground">
            <span className="text-foreground font-bold">140</span> Components
          </div>
          <div className="text-muted-foreground">
            <span className="text-foreground font-bold">2.4M</span> Weekly DLs
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
