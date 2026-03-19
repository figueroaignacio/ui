'use client';

import { Checkbox } from '../../components/checkbox';
import { Label } from '../../components/label';

export function Disabled() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="disabled-terms" disabled />
      <Label htmlFor="disabled-terms" className="opacity-50">
        Accept terms and conditions
      </Label>
    </div>
  );
}
