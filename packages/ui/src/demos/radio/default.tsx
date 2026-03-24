'use client';

import { Radio } from '../../components/radio';

export function Default() {
  return (
    <div className="flex gap-4">
      <Radio aria-label="Default radio" name="default" />
      <Radio aria-label="Selected default radio" name="default" defaultChecked />
    </div>
  );
}
