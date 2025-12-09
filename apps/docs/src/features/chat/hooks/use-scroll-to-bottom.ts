import { RefObject, useEffect } from 'react';

export function useScrollToBottom(ref: RefObject<HTMLElement>, dependency: any[]) {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, dependency);
}
