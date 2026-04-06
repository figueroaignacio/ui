'use client';

import { Drawer } from '../../components/drawer';

const DRAWER_SIDES = ['top', 'right', 'bottom', 'left'] as const;

export function Positions() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {DRAWER_SIDES.map((side) => (
        <Drawer key={side}>
          <Drawer.Trigger className="w-full capitalize" variant="outline">
            {side}
          </Drawer.Trigger>
          <Drawer.Content side={side}>
            <Drawer.Header>
              <Drawer.Title>Edit profile</Drawer.Title>
              <Drawer.Description>
                Make changes to your profile here. Click save when you're done.
              </Drawer.Description>
            </Drawer.Header>
            <div className="py-4">
              <p className="text-muted-foreground text-sm">
                This drawer is appearing from the {side}.
              </p>
            </div>
            <div className="flex justify-end">
              <Drawer.Close>Save changes</Drawer.Close>
            </div>
          </Drawer.Content>
        </Drawer>
      ))}
    </div>
  );
}
