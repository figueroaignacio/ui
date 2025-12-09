import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../components/collapsible';

export function CollapsibleDisabledDemo() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Collapsible variant="bordered" disabled>
        <CollapsibleTrigger>Disabled Collapsible (Closed)</CollapsibleTrigger>
        <CollapsibleContent>
          <p>This content cannot be revealed because the collapsible is disabled.</p>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="bordered" disabled defaultOpen>
        <CollapsibleTrigger>Disabled Collapsible (Open)</CollapsibleTrigger>
        <CollapsibleContent>
          <p>
            This collapsible started open but is now disabled. The content is visible but cannot be
            collapsed.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
