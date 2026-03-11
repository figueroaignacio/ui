'use client';

import { Bell, Keyboard, LogOut, Settings, Shield, User } from 'lucide-react';

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
          <User className="mr-2 size-4" />
          Profile
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Bell className="mr-2 size-4" />
          Notifications
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Settings className="mr-2 size-4" />
          Settings
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Label>Security</DropdownMenu.Label>
        <DropdownMenu.Item>
          <Shield className="mr-2 size-4" />
          Privacy & Security
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Keyboard className="mr-2 size-4" />
          Keyboard shortcuts
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 size-4" />
          Sign out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
