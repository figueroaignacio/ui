import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../components/collapsible';

export function CollapsibleNoChevronDemo() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Collapsible variant="bordered">
        <CollapsibleTrigger showChevron={false}>Click me (No Chevron)</CollapsibleTrigger>
        <CollapsibleContent>
          <p>
            This collapsible doesn't show a chevron icon. Useful when you want a cleaner look or
            when the expandable nature is obvious from context.
          </p>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="card">
        <CollapsibleTrigger showChevron={false} className="font-semibold">
          Another Example
        </CollapsibleTrigger>
        <CollapsibleContent>
          <p>
            Without the chevron, the trigger can look like a simple heading or button, making it
            more subtle in your design.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
