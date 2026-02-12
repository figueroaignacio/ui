import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/collapsible';

export function Card() {
  return (
    <div className="space-y-3">
      <Collapsible variant="card" defaultOpen>
        <CollapsibleTrigger>
          <span className="text-lg font-semibold">🚀 Getting Started</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 pt-3">
            <p className="text-muted-foreground text-sm">
              Welcome to our platform! Here's everything you need to know to get started with your
              first project.
            </p>
            <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
              <li>Create your account</li>
              <li>Set up your workspace</li>
              <li>Invite team members</li>
              <li>Start building!</li>
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="card">
        <CollapsibleTrigger>
          <span className="text-lg font-semibold">📚 Documentation</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 pt-3">
            <p className="text-muted-foreground text-sm">
              Explore our comprehensive documentation to learn about all features and capabilities.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <code className="bg-secondary rounded px-2 py-1 text-xs">API Reference</code>
              <code className="bg-secondary rounded px-2 py-1 text-xs">Guides</code>
              <code className="bg-secondary rounded px-2 py-1 text-xs">Examples</code>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="card">
        <CollapsibleTrigger>
          <span className="text-lg font-semibold">⚙️ Settings</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="space-y-2 pt-3">
            <p className="text-muted-foreground text-sm">
              Customize your experience with our flexible settings and preferences.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
