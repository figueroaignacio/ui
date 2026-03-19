'use client';

import { Breadcrumb } from '../../components/breadcrumb';
import { DropdownMenu } from '../../components/dropdown-menu';

export function Collapsed() {
  return (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <DropdownMenu>
            <DropdownMenu.Trigger className="flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
              <Breadcrumb.Ellipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="start">
              <DropdownMenu.Item>Documentation</DropdownMenu.Item>
              <DropdownMenu.Item>Themes</DropdownMenu.Item>
              <DropdownMenu.Item>GitHub</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator />
        <Breadcrumb.Item>
          <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  );
}
