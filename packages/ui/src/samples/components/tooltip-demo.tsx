import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/tooltip';
import { Button } from './button/button-source';

export function TooltipDemo() {
  return (
    <div className="flex items-center justify-center gap-4 p-10">
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
