import { Avatar } from '@repo/ui/components/avatar';
import { Card } from '@repo/ui/components/card';

export function PreviewTeam() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card variant="outline" className="bg-card backdrop-blur-sm">
        <Card.Content compact className="pt-4 pb-4">
          <div className="border-success/30 bg-success/20 text-success mb-3 flex size-8 items-center justify-center rounded-lg border font-bold">
            FE
          </div>
          <div className="text-foreground text-sm font-bold">Frontend Core</div>
          <div className="text-muted-foreground mb-3 text-xs">82 engineers</div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Avatar size="sm">
              <Avatar.Fallback>JD</Avatar.Fallback>
            </Avatar>
            Lead
          </div>
        </Card.Content>
      </Card>
      <Card variant="outline" className="bg-card backdrop-blur-sm">
        <Card.Content compact className="pt-4 pb-4">
          <div className="border-info/30 bg-info/20 text-info mb-3 flex size-8 items-center justify-center rounded-lg border font-bold">
            UX
          </div>
          <div className="text-foreground text-sm font-bold">Design Systems</div>
          <div className="text-muted-foreground mb-3 text-xs">24 designers</div>
          <div className="text-muted-foreground flex items-center gap-2 text-xs">
            <Avatar size="sm">
              <Avatar.Fallback>MA</Avatar.Fallback>
            </Avatar>{' '}
            Lead
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
