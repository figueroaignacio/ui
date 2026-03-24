'use client';

import { Label } from '../../components/label';
import { Radio } from '../../components/radio';

export function WithLabel() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Radio id="option-one" name="radio-group" defaultChecked />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="option-two" name="radio-group" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
    </div>
  );
}
