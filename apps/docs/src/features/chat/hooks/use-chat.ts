'use client';

import type { Message } from '@/lib/definitions';
import { useChat as useAIChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useRef } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useChat() {
  const t = useTranslations('components.chat.messages');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages: aiMessages,
    status,
    sendMessage: sendAIMessage,
    stop,
    error,
  } = useAIChat({
    transport: new DefaultChatTransport({
      api: `${API_URL}/api/v1/chat`,
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_NACHUI_API_KEY!,
      },
    }),
    messages: [
      {
        id: 'initial',
        role: 'assistant',
        parts: [{ type: 'text', text: t('initial') }],
      },
    ],
  });

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
  };
}
