'use client';

import { Bell, Keyboard, LogOut, Settings, Shield, User } from 'lucide-react';

import { Button } from '../../components/button';
import {
  DropdownLabel,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownSeparator,
} from '../../components/dropdown-menu';

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Account</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownLabel>Account</DropdownLabel>
        <DropdownMenuItem>
          <User className="mr-2 size-4" />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell className="mr-2 size-4" />
          Notifications
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownSeparator />
        <DropdownLabel>Security</DropdownLabel>
        <DropdownMenuItem>
          <Shield className="mr-2 size-4" />
          Privacy & Security
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Keyboard className="mr-2 size-4" />
          Keyboard shortcuts
        </DropdownMenuItem>
        <DropdownSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          <LogOut className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
