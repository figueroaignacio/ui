'use client';

import { PreviewControls } from './preview-cards/preview-controls';
import { PreviewDeploy } from './preview-cards/preview-deploy';
import { PreviewMfa } from './preview-cards/preview-mfa';
import { PreviewNotifications } from './preview-cards/preview-notifications';
import { PreviewProfile } from './preview-cards/preview-profile';
import { PreviewProjectActions } from './preview-cards/preview-project-actions';
import { PreviewSchema } from './preview-cards/preview-schema';
import { PreviewStatus } from './preview-cards/preview-status';
import { PreviewTasks } from './preview-cards/preview-tasks';
import { PreviewTeam } from './preview-cards/preview-team';
import { PreviewUpgrade } from './preview-cards/preview-upgrade';
import { PreviewWorkspace } from './preview-cards/preview-workspace';

export function HeroComponentPreview() {
  return (
    <div className="mx-auto mt-16 w-full">
      <div className="border-border bg-background relative overflow-hidden rounded-sm border backdrop-blur-xl">
        <div className="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-3">
          <div className="flex gap-2">
            <div className="bg-destructive size-3 rounded-full" />
            <div className="bg-warning size-3 rounded-full" />
            <div className="bg-success size-3 rounded-full" />
          </div>
        </div>

        <div className="relative grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-6">
            <PreviewWorkspace />
            <PreviewProjectActions />
            <PreviewTasks />
            <PreviewNotifications />
          </div>
          <div className="flex flex-col gap-6">
            <PreviewMfa />
            <PreviewControls />
            <PreviewProfile />
            <PreviewUpgrade />
          </div>
          <div className="flex flex-col gap-6">
            <PreviewDeploy />
            <PreviewTeam />
            <PreviewStatus />
            <PreviewSchema />
          </div>
        </div>
      </div>
    </div>
  );
}
