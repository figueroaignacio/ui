'use client';

import { Button } from '../../components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/dialog';

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>System Update</DialogTitle>
          <DialogDescription>
            A new version of the platform is available. Please review the changes before continuing.
          </DialogDescription>
        </DialogHeader>

        <div className="text-muted-foreground space-y-4 text-sm">
          <p>
            This update includes important security patches and performance improvements to ensure a
            smoother and safer experience.
          </p>
          <p>
            Make sure to save your work and log out properly before the update is applied. The
            system will automatically restart during off-peak hours.
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Dismiss</Button>
          </DialogClose>
          <Button>View Details</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
