import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../components/collapsible';

export function CollapsibleBorderedDemo() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Collapsible variant="bordered" defaultOpen>
        <CollapsibleTrigger>What is a bordered collapsible?</CollapsibleTrigger>
        <CollapsibleContent>
          <p>
            A bordered collapsible adds a visual container around the content with a border and
            rounded corners, making it stand out from the surrounding content.
          </p>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="bordered">
        <CollapsibleTrigger>When should I use it?</CollapsibleTrigger>
        <CollapsibleContent>
          <p>
            Use bordered collapsibles when you want to group related content visually or when you
            need clear separation between different collapsible sections.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
