'use client';

import { Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import * as React from 'react';
import { Button } from '../../components/button';
import { DropdownMenu } from '../../components/dropdown-menu';

export function Checkboxes() {
  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">View Options</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56" align="start">
        <DropdownMenu.Label>Appearance</DropdownMenu.Label>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onClick={() => setShowStatusBar(!showStatusBar)}>
          <span className="flex w-6 items-center justify-center">
            {showStatusBar && <HugeiconsIcon icon={Tick02Icon} size={16} />}
          </span>
          Status Bar
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setShowActivityBar(!showActivityBar)}>
          <span className="flex w-6 items-center justify-center">
            {showActivityBar && <HugeiconsIcon icon={Tick02Icon} size={16} />}
          </span>
          Activity Bar
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => setShowPanel(!showPanel)}>
          <span className="flex w-6 items-center justify-center">
            {showPanel && <HugeiconsIcon icon={Tick02Icon} size={16} />}
          </span>
          Panel
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
