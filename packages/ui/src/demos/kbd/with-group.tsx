'use client';

import { Kbd, KbdGroup } from '../../components/kbd';

export function WithGroup() {
  return (
    <div className="flex items-center gap-6">
      <KbdGroup>
        <Kbd abbrTitle="Control">Ctrl</Kbd>
        <span>+</span>
        <Kbd abbrTitle="Shift">⇧</Kbd>
        <span>+</span>
        <Kbd>K</Kbd>
      </KbdGroup>
    </div>
  );
}
