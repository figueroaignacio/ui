// ChatMessages.tsx
import { useEffect, useRef } from 'react';
import { ChatLoading } from './chat-loading';
import { ChatMessage } from './chat-message';

// Types
import type { Message } from '@/lib/definitions';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages]);

  return (
    <div className="flex-1 space-y-4 overflow-x-hidden overflow-y-auto">
      {messages.map((msg, idx) => (
        <div key={idx} className="flex flex-col items-start">
          <span className="text-muted-foreground text-sm">
            {msg.role === 'assistant' ? 'I7A Bot' : 'You'}
          </span>
          <ChatMessage message={msg} />
        </div>
      ))}
      {isLoading && <ChatLoading />}
      <div ref={messagesEndRef} />
    </div>
  );
}
