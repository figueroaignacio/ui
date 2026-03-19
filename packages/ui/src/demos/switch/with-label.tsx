'use client';

import { Label } from '../../components/label';
import { Switch } from '../../components/switch';

export function WithLabel() {
  return (
    <div className="flex items-center gap-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}
