'use client';

import * as React from 'react';
import { Button } from '../../components/button';
import { DropdownMenu } from '../../components/dropdown-menu';

export function RadioGroup() {
  const [position, setPosition] = React.useState('bottom');

  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button variant="outline">Panel Position</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-56" align="start">
        <DropdownMenu.Label>Panel Position</DropdownMenu.Label>
        <DropdownMenu.Separator />
        {['Top', 'Bottom', 'Right', 'Left'].map((pos) => {
          const value = pos.toLowerCase();
          const isSelected = position === value;
          return (
            <DropdownMenu.Item key={value} onClick={() => setPosition(value)}>
              <span className="flex w-6 items-center justify-center">
                {isSelected && <div className="bg-foreground size-2 rounded-full" />}
              </span>
              {pos}
            </DropdownMenu.Item>
          );
        })}
      </DropdownMenu.Content>
    </DropdownMenu>
  );
}
