'use client';

import { Button } from '../../components/button';
import { Toast, useToast } from '../../components/toast';

function VariantsDemo() {
  const { toast } = useToast();

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() =>
          toast({ title: 'Default notification', description: 'This is a default toast.' })
        }
      >
        Default
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: 'Success!',
            description: 'Your changes have been saved.',
            variant: 'success',
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: 'Error',
            description: 'Something went wrong. Please try again.',
            variant: 'error',
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: 'Info',
            description: 'A new version is available.',
            variant: 'info',
          })
        }
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: 'Warning',
            description: 'Your session is about to expire.',
            variant: 'warning',
          })
        }
      >
        Warning
      </Button>
    </div>
  );
}

export function Variants() {
  return (
    <Toast.Provider>
      <VariantsDemo />
    </Toast.Provider>
  );
}
