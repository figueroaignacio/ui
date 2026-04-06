'use client';

import { useState } from 'react';
import { Banner } from '../../components/banner';

export function Dismissible() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex w-full flex-col gap-3">
      <Banner key={key} variant="info" onClose={() => {}}>
        <Banner.Content>
          <Banner.Title>Dismissible banner</Banner.Title>
          <Banner.Description>Click the close button to dismiss this banner.</Banner.Description>
        </Banner.Content>
      </Banner>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="text-muted-foreground hover:text-foreground w-fit text-sm underline transition-colors"
      >
        Reset banner
      </button>
    </div>
  );
}
