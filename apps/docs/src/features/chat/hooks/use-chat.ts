'use client';

import type { Message } from '@/lib/definitions';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

export function useChat() {
  const t = useTranslations('components.chat.messages');

  const [messages, setMessages] = useState<Message[]>(() => [
    { role: 'assistant', content: t('initial') },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesRef = useRef<Message[]>([{ role: 'assistant', content: t('initial') }]);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading || isStreaming) return;

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      const userMessage: Message = { role: 'user', content: content.trim() };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messagesRef.current, userMessage],
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err.error || 'Failed to get response');
        }

        if (!response.body) throw new Error('No response body');

        setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
        setIsLoading(false);
        setIsStreaming(true);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });

          setMessages((prev) => {
            const next = [...prev];
            const last = next[next.length - 1];
            if (last && last.role === 'assistant') {
              next[next.length - 1] = {
                ...last,
                content: last.content + chunk,
              };
            }
            return next;
          });
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') return;

        console.error('Chat error:', error);
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          if (last && last.role === 'assistant' && last.content === '') {
            next[next.length - 1] = { ...last, content: t('error') };
            return next;
          }
          return [...prev, { role: 'assistant', content: t('error') }];
        });
      } finally {
        setIsLoading(false);
        setIsStreaming(false);
      }
    },
    [isLoading, isStreaming, t],
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
  };
}
