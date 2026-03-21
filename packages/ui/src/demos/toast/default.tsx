'use client';

import { Button } from '../../components/button';
import { Toast, useToast } from '../../components/toast';

function ToastDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: 'Event created',
          description: 'Your event has been created successfully.',
        })
      }
    >
      Show Toast
    </Button>
  );
}

export function Default() {
  return (
    <Toast.Provider>
      <ToastDemo />
    </Toast.Provider>
  );
}
