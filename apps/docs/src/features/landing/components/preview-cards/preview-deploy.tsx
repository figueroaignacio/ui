import { Rocket01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '@repo/ui/components/button';
import { Card } from '@repo/ui/components/card';
import { Separator } from '@repo/ui/components/separator';

export function PreviewDeploy() {
  return (
    <Card variant="outline">
      <Card.Content compact className="space-y-6 pt-6 pb-6">
        <div className="flex flex-col items-center gap-2">
          <div className="border-primary/20 bg-primary/10 mb-2 flex size-12 items-center justify-center rounded-full border">
            <HugeiconsIcon icon={Rocket01Icon} className="text-primary" size={24} />
          </div>
          <div className="text-center">
            <h4 className="text-foreground text-lg font-bold">Deploy to Edge</h4>
            <p className="text-muted-foreground mt-1 text-sm leading-tight text-balance">
              Push your application globally in seconds.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full">Start Deployment</Button>
          <Separator label="or" />
          <Button variant="outline" className="bg-secondary text-secondary-foreground w-full">
            Deploy via CLI
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
