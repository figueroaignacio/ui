import { useEffect } from 'react';

export function useKbdShortcut(keys: string[], callback: (e: KeyboardEvent) => void) {
  const keysString = keys.join('+');

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const currentKeys = keysString.split('+');
      const keyLowerCase = event.key.toLowerCase();
      const needsMeta = currentKeys.includes('meta') || currentKeys.includes('cmd');
      const needsCtrl = currentKeys.includes('ctrl');
      const needsShift = currentKeys.includes('shift');
      const needsAlt = currentKeys.includes('alt');

      const targetKey = currentKeys.find(
        (k) => !['meta', 'cmd', 'ctrl', 'shift', 'alt'].includes(k),
      );

      const isModifierMatched =
        needsMeta || needsCtrl ? event.metaKey || event.ctrlKey : !(event.metaKey || event.ctrlKey);

      if (
        isModifierMatched &&
        (needsShift ? event.shiftKey : !event.shiftKey) &&
        (needsAlt ? event.altKey : !event.altKey) &&
        targetKey === keyLowerCase
      ) {
        event.preventDefault();
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keysString, callback]);
}
