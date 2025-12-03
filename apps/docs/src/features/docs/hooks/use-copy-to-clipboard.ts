'use client';

import { useCallback, useState } from 'react';

export function useCopyToClipboard(timeout = 2000) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), timeout);
      } catch (error) {
        console.error('Failed to copy text:', error);
      }
    },
    [timeout],
  );

  return { isCopied, copyToClipboard };
}
