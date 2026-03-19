'use client';

import { Label } from '../../components/label';
import { Switch } from '../../components/switch';

export function Disabled() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="disabled-switch" disabled />
      <Label htmlFor="disabled-switch" className="opacity-50">
        Airplane Mode
      </Label>
    </div>
  );
}
