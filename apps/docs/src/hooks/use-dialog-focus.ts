import { useCallback, useRef } from 'react';

export function useDialogFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenChange = useCallback((open: boolean, onClear: () => void) => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      onClear();
    }
  }, []);

  return { inputRef, handleOpenChange };
}
