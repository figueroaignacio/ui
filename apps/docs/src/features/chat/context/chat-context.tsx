'use client';

import { createContext, ReactNode, useCallback, useContext, useState, type RefObject } from 'react';
import { useChat } from '../hooks/use-chat';
import { type Message } from '@/lib/definitions';

interface ChatContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openChat: () => void;
  closeChat: () => void;
  triggerExplanation: (componentName: string, promptTemplate: string) => void;
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  sendMessage: (content: string) => Promise<void>;
  handleSuggestionClick: (text: string) => void;
  messagesEndRef: RefObject<HTMLDivElement | null>;
  stop: () => void;
  error: Error | undefined;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    messages,
    isLoading,
    isStreaming,
    sendMessage,
    handleSuggestionClick,
    messagesEndRef,
    stop,
    error,
  } = useChat();

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);

  const triggerExplanation = useCallback(
    (componentName: string, promptTemplate: string) => {
      const prompt = promptTemplate.replace('{component}', componentName);
      setIsOpen(true);
      void sendMessage(prompt);
    },
    [sendMessage],
  );

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        setIsOpen,
        openChat,
        closeChat,
        triggerExplanation,
        messages,
        isLoading,
        isStreaming,
        sendMessage,
        handleSuggestionClick,
        messagesEndRef,
        stop,
        error,
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
