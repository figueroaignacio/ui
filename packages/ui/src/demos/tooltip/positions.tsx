'use client';

import { Button } from '../../components/button';
import { Tooltip } from '../../components/tooltip';

export function Positions() {
  return (
    <div className="flex flex-col items-center gap-10 md:flex-row">
      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Top</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="top">Tooltip on top</Tooltip.Content>
      </Tooltip>

      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Bottom</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="bottom">Tooltip on bottom</Tooltip.Content>
      </Tooltip>

      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Left</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="left">Tooltip on left</Tooltip.Content>
      </Tooltip>

      <Tooltip>
        <Tooltip.Trigger asChild>
          <Button variant="outline">Right</Button>
        </Tooltip.Trigger>
        <Tooltip.Content side="right">Tooltip on right</Tooltip.Content>
      </Tooltip>
    </div>
  );
}
