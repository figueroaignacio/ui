'use client';

import { createContext, ReactNode, useCallback, useContext, useState } from 'react';

interface ChatContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openChat: () => void;
  closeChat: () => void;
  triggerExplanation: (componentName: string, promptTemplate: string) => void;
  externalSendMessage: ((content: string) => void) | null;
  setExternalSendMessage: (fn: (content: string) => void) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [externalSendMessage, setExternalSendMessageInternal] = useState<
    ((content: string) => void) | null
  >(null);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  const setExternalSendMessage = useCallback((fn: (content: string) => void) => {
    setExternalSendMessageInternal(() => fn);
  }, []);

  const triggerExplanation = useCallback(
    (componentName: string, promptTemplate: string) => {
      const prompt = promptTemplate.replace('{component}', componentName);
      setIsOpen(true);
      if (externalSendMessage) {
        externalSendMessage(prompt);
      } else {
        console.warn('Chat not ready to receive external messages');
      }
    },
    [externalSendMessage],
  );

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openChat,
        closeChat,
        triggerExplanation,
        externalSendMessage,
        setExternalSendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
