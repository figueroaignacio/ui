'use client';

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
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="start">
        <DropdownLabel>Quick Actions</DropdownLabel>
        <DropdownMenuItem onSelect={() => alert('Generate report')}>
          Generate Report 📝
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => alert('Send feedback')}>
          Send Feedback ✉️
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => alert('Start tutorial')}>
          Start Tutorial 🎓
        </DropdownMenuItem>

        <DropdownSeparator />

        <DropdownLabel>Fun Stuff</DropdownLabel>
        <DropdownMenuItem onSelect={() => alert('Random joke')}>Tell me a joke 😂</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => alert('Motivational quote')}>
          Motivation 💪
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => alert('Surprise')}>Surprise 🎁</DropdownMenuItem>

        <DropdownSeparator />

        <DropdownLabel>Settings</DropdownLabel>
        <DropdownMenuItem onSelect={() => alert('Toggle dark mode')}>Dark Mode 🌙</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => alert('Change language')}>Language 🌐</DropdownMenuItem>
        <DropdownMenuItem disabled>Advanced ⚠️</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
