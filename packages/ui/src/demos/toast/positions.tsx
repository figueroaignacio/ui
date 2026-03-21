'use client';

import * as React from 'react';
import { Button } from '../../components/button';
import { Toast, useToast, type ToastPosition } from '../../components/toast';

const positions: { label: string; value: ToastPosition }[] = [
  { label: 'Top Left', value: 'top-left' },
  { label: 'Top Right', value: 'top-right' },
  { label: 'Bottom Left', value: 'bottom-left' },
  { label: 'Bottom Right', value: 'bottom-right' },
];

function PositionsInner() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() =>
        toast({
          title: 'Notification',
          description: 'Check the position of this toast.',
        })
      }
    >
      Show Toast
    </Button>
  );
}

export function Positions() {
  const [position, setPosition] = React.useState<ToastPosition>('bottom-right');

  return (
    <Toast.Provider position={position}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {positions.map((pos) => (
            <Button
              key={pos.value}
              variant={position === pos.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPosition(pos.value)}
            >
              {pos.label}
            </Button>
          ))}
        </div>
        <PositionsInner />
      </div>
    </Toast.Provider>
  );
}
