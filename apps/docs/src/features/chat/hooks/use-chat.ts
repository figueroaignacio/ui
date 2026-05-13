'use client';

import type { Message } from '@/lib/definitions';
import { useChat as useAIChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useCallback, useMemo, useRef } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const transport = new DefaultChatTransport({
  api: `${API_URL}/api/v1/chat`,
});

export function useChat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages: uiMessages,
    setMessages,
    status,
    sendMessage: sendAIMessage,
    stop,
    error,
  } = useAIChat({ transport });

  const resetChat = useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  const messages: Message[] = useMemo(() => {
    return uiMessages.map((m) => {
      const content = m.parts
        .filter((p) => p.type === 'text')
        .map((p) => p.text ?? '')
        .join('');

      return {
        id: m.id,
        role: m.role as Message['role'],
        content,
      };
    });
  }, [uiMessages]);

  const isLoading = status === 'submitted' || status === 'streaming';
  const isStreaming = status === 'streaming';

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;
      await sendAIMessage({ text: content.trim() });
    },
    [isLoading, sendAIMessage],
  );

  const handleSuggestionClick = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage],
  );

  return {
    messages,
    isLoading,
    isStreaming,
    messagesEndRef,
    sendMessage,
    handleSuggestionClick,
    stop,
    error,
    resetChat,
  };
}
