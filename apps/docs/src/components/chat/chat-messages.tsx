// Components
import { ChatLoading } from './chat-loading';
import { ChatMessage } from './chat-message';

// Types
import type { Message } from '@/lib/definitions';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export function ChatMessages({ messages, isLoading, messagesEndRef }: ChatMessagesProps) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto p-4">
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
