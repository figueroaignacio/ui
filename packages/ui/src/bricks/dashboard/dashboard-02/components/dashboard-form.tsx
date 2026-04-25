'use client';

import { Button } from '../../../../components/button';
import { Card } from '../../../../components/card';
import { Progress } from '../../../../components/progress';
import { Steps } from '../../../../components/steps';

export function Dashboard02() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl space-y-4">
        <Card>
          <Card.Header>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <Card.Title>Project setup</Card.Title>
                <Card.Description>
                  Complete these steps to ship your first release.
                </Card.Description>
              </div>
              <div className="w-full max-w-xs space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-foreground font-medium">62%</span>
                </div>
                <Progress value={62} />
              </div>
            </div>
          </Card.Header>
          <Card.Content>
            <Steps className="mb-0">
              <h4 className="text-foreground text-sm font-semibold">Connect your repository</h4>
              <p className="text-muted-foreground text-sm">
                Link GitHub and configure automatic deployments.
              </p>

              <h4 className="text-foreground text-sm font-semibold">Add environment variables</h4>
              <p className="text-muted-foreground text-sm">
                Set API keys and database URLs for production.
              </p>

              <h4 className="text-foreground text-sm font-semibold">Invite your team</h4>
              <p className="text-muted-foreground text-sm">
                Create roles and grant access to the workspace.
              </p>
            </Steps>
          </Card.Content>
          <Card.Footer align="between">
            <Button variant="secondary">Skip for now</Button>
            <Button>Continue</Button>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}
