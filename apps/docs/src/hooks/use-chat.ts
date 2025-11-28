'use client';

// Hooks
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

// Types
import type { Message } from '../types';

export function useChat() {
  const t = useTranslations('components.chat.messages');

  const INITIAL_MESSAGE: Message = {
    role: 'assistant',
    content: t('initial'),
  };

  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: content.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: t('error'),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    messagesEndRef,
    sendMessage,
  };
}
