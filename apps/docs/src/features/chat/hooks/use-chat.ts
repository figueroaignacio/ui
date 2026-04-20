'use client';

import type { Message } from '@/lib/definitions';
import { useChat as useAIChat, type UIMessage } from '@ai-sdk/react';
import { useLocalStorage } from '@repo/ui/hooks/use-local-storage';
import { DefaultChatTransport } from 'ai';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useChat() {
  const t = useTranslations('components.chat.messages');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessage = useMemo(
    () =>
      ({
        id: 'initial',
        role: 'assistant',
        parts: [{ type: 'text', text: t('initial') }],
      }) as UIMessage,
    [t],
  );

  const [storedMessages, setStoredMessages, removeStoredMessages, isMounted] = useLocalStorage<
    UIMessage[]
  >('mate-ui-chat', [initialMessage]);

  const {
    messages: aiMessages,
    setMessages,
    status,
    sendMessage: sendAIMessage,
    stop,
    error,
  } = useAIChat({
    transport: new DefaultChatTransport({
      api: `${API_URL}/api/v1/chat`,
    }),
    messages: [initialMessage],
  });

  useEffect(() => {
    if (isMounted) {
      const item = window.localStorage.getItem('mate-ui-chat');
      if (item) {
        try {
          const parsed = JSON.parse(item) as UIMessage[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed);
          }
        } catch (e) {
          console.error('Failed to parse stored messages', e);
        }
      }
    }
  }, [isMounted, setMessages]);

  useEffect(() => {
    if (isMounted && aiMessages.length > 0) {
      setStoredMessages(aiMessages);
    }
  }, [aiMessages, isMounted, setStoredMessages]);

  const resetChat = useCallback(() => {
    removeStoredMessages();
    setMessages([initialMessage]);
  }, [removeStoredMessages, setMessages, initialMessage]);

  const messages: Message[] = useMemo(() => {
    return aiMessages.map((m) => {
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
  }, [aiMessages]);

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
