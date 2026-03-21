'use client';

import { Separator } from '../../components/separator';

export function WithLabel() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <Separator label="OR" />
      <Separator label="or continue with" />
    </div>
  );
}
