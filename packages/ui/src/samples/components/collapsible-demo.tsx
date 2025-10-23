'use client';

import { Button } from '../../components/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/collapsible';

export function CollapsibleDemo() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6">
      {/* Professional Collapsible Card */}
      <Collapsible variant="card">
        <CollapsibleTrigger>
          <span className="text-lg font-semibold">Project Overview</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="text-muted-foreground space-y-2 text-sm">
            <p>
              This project is focused on building a modern UI library using React, TypeScript, and
              TailwindCSS. The goal is to create reusable, accessible, and flexible components for
              professional web applications.
            </p>
            <p>
              Components are fully customizable, support multiple variants, and include smooth
              transitions and animations for a polished user experience.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="card" defaultOpen>
        <CollapsibleTrigger>
          <span className="text-lg font-semibold">Key Features</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
            <li>Accessible and semantic HTML structure</li>
            <li>Multiple visual variants for flexibility</li>
            <li>Smooth animations with low layout shift</li>
            <li>Easy integration with React projects</li>
          </ul>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible variant="card">
        <CollapsibleTrigger>
          <span className="text-lg font-semibold">Actions</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="mt-2 flex flex-col gap-2">
            <Button>View Documentation</Button>
            <Button variant="outline">Get Started</Button>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
