'use client';

import { Button } from '../../components/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/tooltip';

export function Default() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  );
}
