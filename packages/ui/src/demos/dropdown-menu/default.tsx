'use client';

import {
  KeyboardIcon,
  Logout02Icon,
  Notification03Icon,
  Settings01Icon,
  Shield02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { Button } from '../../components/button';
import { DropdownMenu } from '../../components/dropdown-menu';

export function Default() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Account</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56" align="start">
        <DropdownMenu.Label>Account</DropdownMenu.Label>
        <DropdownMenu.Item>
          <HugeiconsIcon icon={UserIcon} className="mr-2 size-4" />
          Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <HugeiconsIcon icon={Notification03Icon} className="mr-2 size-4" />
          Notifications
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <HugeiconsIcon icon={Settings01Icon} className="mr-2 size-4" />
          Settings
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Label>Security</DropdownMenu.Label>
        <DropdownMenu.Item>
          <HugeiconsIcon icon={Shield02Icon} className="mr-2 size-4" />
          Privacy & Security
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <HugeiconsIcon icon={KeyboardIcon} className="mr-2 size-4" />
          Keyboard shortcuts
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className="text-destructive focus:text-destructive">
          <HugeiconsIcon icon={Logout02Icon} className="mr-2 size-4" />
          Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
