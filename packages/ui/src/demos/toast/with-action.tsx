'use client';

import { Button } from '../../components/button';
import { Toast, useToast } from '../../components/toast';

function WithActionDemo() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: 'Message sent',
          description: 'Your message has been sent successfully.',
          action: {
            label: 'Undo',
            onClick: () => {
              // undo action
            },
          },
        })
      }
    >
      Show Toast with Action
    </Button>
  );
}

export function WithAction() {
  return (
    <Toast.Provider>
      <WithActionDemo />
    </Toast.Provider>
  );
}
