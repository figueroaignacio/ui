'use client';

import { Kbd } from '../../components/kbd';

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Kbd size="sm">⌘</Kbd>
      <Kbd size="default">⌘</Kbd>
      <Kbd size="lg">⌘</Kbd>
    </div>
  );
}
