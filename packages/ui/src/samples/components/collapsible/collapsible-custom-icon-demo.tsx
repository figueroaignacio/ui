import { Minus, Plus } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../components/collapsible';

export function CollapsibleCustomIconDemo() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Collapsible variant="bordered">
        <CollapsibleTrigger chevronIcon={<Plus className="h-4 w-4" />}>
          Custom Plus Icon
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>
            This collapsible uses a plus icon instead of the default chevron. The icon rotates when
            opened, creating a nice visual transition.
          </p>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="card">
        <CollapsibleTrigger chevronIcon={<Minus className="h-4 w-4" />}>
          Custom Minus Icon
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>
            You can use any icon you want! This example uses a minus icon to indicate collapsible
            content.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
