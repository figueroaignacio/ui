'use client';

import { Label } from '../../components/label';
import { Radio } from '../../components/radio';

export function Disabled() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Radio id="disabled-option" disabled name="disabled-group" />
        <Label htmlFor="disabled-option" className="opacity-50">
          Disabled option
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Radio id="disabled-checked" disabled defaultChecked name="disabled-group" />
        <Label htmlFor="disabled-checked" className="opacity-50">
          Disabled selected option
        </Label>
      </div>
    </div>
  );
}
