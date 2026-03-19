'use client';

import * as React from 'react';
import { Button } from '../../components/button';
import { Sheet } from '../../components/sheet';

const SHEET_SIDES = ['top', 'right', 'bottom', 'left'] as const;

export function Positions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <Sheet.Trigger className="w-full capitalize">{side}</Sheet.Trigger>
          <Sheet.Content side={side}>
            <Sheet.Header>
              <Sheet.Title>Edit profile</Sheet.Title>
              <Sheet.Description>
                Make changes to your profile here. Click save when you're done.
              </Sheet.Description>
            </Sheet.Header>
            <div className="py-4">
              <p className="text-muted-foreground text-sm">
                This sheet is appearing from the {side}.
              </p>
            </div>
            <div className="flex justify-end">
              <Sheet.Close>
                <Button>Save changes</Button>
              </Sheet.Close>
            </div>
          </Sheet.Content>
        </Sheet>
      ))}
    </div>
  );
}
