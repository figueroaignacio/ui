'use client';

import { Checkbox } from '../../components/checkbox';
import { Label } from '../../components/label';

export function WithLabel() {
  return (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
