'use client';

import { Button } from '../../components/button';
import { Dialog } from '../../components/dialog';

export function Default() {
  return (
    <Dialog>
      <Dialog.Trigger asChild>
        <Button>Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Are you absolutely sure?</Dialog.Title>
          <Dialog.Description>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button variant="outline">Cancel</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <Button variant="destructive">Delete Account</Button>
          </Dialog.Close>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog>
  );
}
