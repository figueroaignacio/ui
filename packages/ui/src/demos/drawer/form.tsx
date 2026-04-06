'use client';

import { Drawer } from '../../components/drawer';
import { Input } from '../../components/input';
import { Label } from '../../components/label';

export function Form() {
  return (
    <Drawer>
      <Drawer.Trigger variant="outline">Edit Profile</Drawer.Trigger>
      <Drawer.Content side="bottom">
        <Drawer.Header>
          <Drawer.Title>Edit profile</Drawer.Title>
          <Drawer.Description>
            Make changes to your profile here. Click save when you&apos;re done.
          </Drawer.Description>
        </Drawer.Header>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Ignacio Figueroa" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@figueroaignacio" className="col-span-3" />
          </div>
        </div>
        <div className="flex justify-end">
          <Drawer.Close>Save changes</Drawer.Close>
        </div>
      </Drawer.Content>
    </Drawer>
  );
}
