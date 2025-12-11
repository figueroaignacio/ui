// Hooks
import { useEffect, useRef } from 'react';

// Components
import { ChatLoading } from './chat-loading';
import { ChatMessage } from './chat-message';
import { ChatSuggestions } from './chat-suggestions';

// Types
import type { Message } from '@/lib/definitions';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onSuggestionClick: (text: string) => void;
}

export function ChatMessages({ messages, isLoading, onSuggestionClick }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [messages]);

  const showSuggestions = messages.length === 1 && messages[0].role === 'assistant';

  return (
    <div className="flex-1 space-y-4 overflow-x-hidden overflow-y-auto p-4">
      {messages.map((msg, idx) => (
        <div key={idx} className="flex flex-col items-start">
          <span className="text-muted-foreground text-sm">
            {msg.role === 'assistant' ? 'I7A Bot' : 'You'}
          </span>
          <ChatMessage message={msg} />
        </div>
      ))}

      {showSuggestions && !isLoading && <ChatSuggestions onSuggestionClick={onSuggestionClick} />}

      {isLoading && <ChatLoading />}
      <div ref={messagesEndRef} />
    </div>
  );
}
