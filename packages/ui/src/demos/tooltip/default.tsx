'use client';

import { Button } from '../../components/button';
import { Tooltip } from '../../components/tooltip';

export function Default() {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild>
        <Button variant="outline">Hover me</Button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <p>Add to library</p>
      </Tooltip.Content>
    </Tooltip>
  );
}
