'use client';

import { useLayoutEffect } from 'react';

let lockCount = 0;
let originalStyle = '';

export function useLockBodyScroll(isLocked: boolean) {
  useLayoutEffect(() => {
    if (isLocked) {
      if (lockCount === 0) {
        originalStyle = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      lockCount++;

      return () => {
        lockCount--;
        if (lockCount === 0) {
          document.body.style.overflow = originalStyle;
        }
      };
    }
  }, [isLocked]);
}
