'use client';

import { ThemeProvider } from 'nach-themes';
import { ChatEngine } from '@/features/chat/store/chat-engine';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <ChatEngine />
    </ThemeProvider>
  );
}
