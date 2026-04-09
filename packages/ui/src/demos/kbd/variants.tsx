'use client';

import { Kbd } from '../../components/kbd';

export function Variants() {
  return (
    <div className="flex items-center gap-4">
      <Kbd variant="default">Shift</Kbd>
      <Kbd variant="outline">Shift</Kbd>
    </div>
  );
}
