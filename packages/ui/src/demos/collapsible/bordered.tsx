import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/collapsible';

export function Bordered() {
  return (
    <div className="space-y-3">
      <Collapsible variant="bordered" defaultOpen>
        <CollapsibleTrigger>
          <span className="text-lg font-semibold">What is React?</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 pt-3">
            <p className="text-muted-foreground text-sm">
              React is a JavaScript library for building user interfaces. It lets you create
              reusable components that manage their own state.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="bordered">
        <CollapsibleTrigger>
          <span className="text-lg font-semibold">What are React Hooks?</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 pt-3">
            <p className="text-muted-foreground text-sm">
              Hooks are functions that let you use state and other React features in functional
              components. Common hooks include useState, useEffect, and useContext.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="bordered">
        <CollapsibleTrigger>
          <span className="text-lg font-semibold">What is JSX?</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 pt-3">
            <p className="text-muted-foreground text-sm">
              JSX is a syntax extension for JavaScript that looks similar to HTML. It allows you to
              write UI components in a more declarative way.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
