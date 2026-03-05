'use client';

import { ChatProvider } from '@/features/chat/context/chat-context';
import { ThemeProvider } from 'nach-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ChatProvider>{children}</ChatProvider>
    </ThemeProvider>
  );
}
