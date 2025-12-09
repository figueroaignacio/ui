import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../components/collapsible';

export function CollapsibleCardDemo() {
  return (
    <div className="w-full max-w-md space-y-4">
      <Collapsible variant="card" defaultOpen>
        <CollapsibleTrigger>What makes the card variant special?</CollapsibleTrigger>
        <CollapsibleContent>
          <p>
            The card variant provides the most visual prominence with a background color, border,
            and subtle shadow. It's perfect for important content that needs to stand out.
          </p>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="card">
        <CollapsibleTrigger>Best practices</CollapsibleTrigger>
        <CollapsibleContent>
          <p>
            Use card variant sparingly for emphasis. Too many card-styled elements can make your
            interface feel cluttered. Reserve it for primary information or key features.
          </p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
