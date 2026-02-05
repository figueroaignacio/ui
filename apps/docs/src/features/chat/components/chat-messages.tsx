import type { Message } from '@/lib/definitions';
import { useEffect, useRef } from 'react';
import { ChatLoading } from './chat-loading';
import { ChatMessage } from './chat-message';
import { ChatSuggestions } from './chat-suggestions';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  onSuggestionClick: (text: string) => void;
}

export function ChatMessages({ messages, isLoading, onSuggestionClick }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessageCount = useRef(messages.length);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const showSuggestions = messages.length === 1 && messages[0].role === 'assistant';

  return (
    <div className="flex-1 space-y-4 overflow-x-hidden overflow-y-auto p-4">
      {messages.map((msg, idx) => {
        const isLast = idx === messages.length - 1;
        const shouldAnimate = isLast && idx >= initialMessageCount.current;

        return (
          <div key={idx} className="flex flex-col items-start">
            <span className="text-muted-foreground text-sm">
              {msg.role === 'assistant' ? 'NachUI Bot' : 'You'}
            </span>
            <ChatMessage message={msg} shouldAnimate={shouldAnimate} onType={scrollToBottom} />
          </div>
        );
      })}
      {showSuggestions && !isLoading && <ChatSuggestions onSuggestionClick={onSuggestionClick} />}
      {isLoading && <ChatLoading />}
      <div ref={messagesEndRef} />
    </div>
  );
}
