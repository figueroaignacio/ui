import { Rocket01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { Progress } from '@repo/ui/components/progress';

export function PreviewDeploy() {
  return (
    <Card variant="outline">
      <Card.Content compact className="space-y-6 pt-6 pb-6">
        <div className="flex flex-col items-center gap-2">
          <div className="border-border bg-muted/50 mb-2 flex size-12 items-center justify-center rounded-full border">
            <HugeiconsIcon icon={Rocket01Icon} className="text-foreground" size={24} />
          </div>
          <div className="text-center">
            <h4 className="text-foreground flex items-center justify-center gap-2 text-lg font-bold">
              Deploy to Edge
              <Badge variant="secondary" className="h-5 animate-pulse text-[10px]">
                LIVE
              </Badge>
            </h4>
            <p className="text-muted-foreground mt-1 text-sm leading-tight text-balance">
              Push your application globally in seconds.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-bold tracking-widest uppercase">
              <span className="text-muted-foreground">Uploading Assets</span>
              <span className="text-foreground">85%</span>
            </div>
            <Progress value={85} />
          </div>

          <div className="flex gap-2">
            <Button className="flex-1" size="sm">
              View Log
            </Button>
            <Button variant="outline" className="flex-1" size="sm">
              Cancel
            </Button>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
