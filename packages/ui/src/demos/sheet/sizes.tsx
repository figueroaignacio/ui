'use client';

import * as React from 'react';
import { Sheet } from '../../components/sheet';

const SHEET_SIZES = ['sm', 'md', 'lg', 'full'] as const;

export function Sizes() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {SHEET_SIZES.map((size) => (
        <Sheet key={size}>
          <Sheet.Trigger className="w-full uppercase">{size}</Sheet.Trigger>
          <Sheet.Content side="right" size={size}>
            <Sheet.Header>
              <Sheet.Title className="uppercase">Size: {size}</Sheet.Title>
              <Sheet.Description>This sheet uses the {size} size variant.</Sheet.Description>
            </Sheet.Header>
            <div className="py-4">
              <p className="text-muted-foreground text-sm">
                Notice how the width changes based on the size prop.
              </p>
            </div>
          </Sheet.Content>
        </Sheet>
      ))}
    </div>
  );
}
