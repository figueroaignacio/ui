import { CheckmarkBadge01Icon, Mail01Icon, PlusSignIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Avatar } from '@repo/ui/components/avatar';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';

export function PreviewProfile() {
  return (
    <Card variant="outline" className="overflow-hidden">
      <Card.Content compact className="space-y-4 pt-5 pb-5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar size="md" className="border-border ring-background border-2 ring-2">
              <Avatar.Image src="https://github.com/figueroaignacio.png" />
              <Avatar.Fallback>IF</Avatar.Fallback>
            </Avatar>
            <div>
              <div className="text-foreground flex items-center gap-1.5 text-sm font-bold">
                Ignacio Figueroa
                <HugeiconsIcon icon={CheckmarkBadge01Icon} size={14} className="text-primary" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-xs">@nach_ui</span>
                <Badge variant="secondary" className="h-4 px-1 text-[10px]">
                  PRO
                </Badge>
              </div>
            </div>
          </div>
          <Button size="icon" variant="outline" className="size-8 rounded-full">
            <HugeiconsIcon icon={PlusSignIcon} size={14} />
          </Button>
        </div>

        <div className="text-foreground text-xs leading-relaxed">
          Building for the future of UI and Frontend Development. Lead Designer at{' '}
          <span className="font-bold underline decoration-zinc-500 underline-offset-4">NachUI</span>
          .
        </div>

        <div className="flex items-center justify-between gap-2 border-t border-dashed pt-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-0.5">
              <span className="text-foreground text-xs font-bold">140</span>
              <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
                Components
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-foreground text-xs font-bold">2.4M</span>
              <span className="text-muted-foreground text-[10px] tracking-wider uppercase">
                Downloads
              </span>
            </div>
          </div>
          <Button size="sm" variant="default" className="h-8 gap-2 px-3">
            <HugeiconsIcon icon={Mail01Icon} size={14} />
            Hire
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
