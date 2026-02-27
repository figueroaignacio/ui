import type { Message } from '@/lib/definitions';
import { AnimatePresence, motion } from 'motion/react';
import { type RefObject, useEffect } from 'react';
import { ChatLoading } from './chat-loading';
import { ChatMessage } from './chat-message';
import { ChatSuggestions } from './chat-suggestions';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  endRef: RefObject<HTMLDivElement>;
  onSuggestionClick: (text: string) => void;
}

export function ChatMessages({
  messages,
  isLoading,
  isStreaming,
  endRef,
  onSuggestionClick,
}: ChatMessagesProps) {
  const showSuggestions = messages.length === 1 && messages[0].role === 'assistant';

  const lastMsg = messages[messages.length - 1];
  const lastContent = lastMsg?.content ?? '';
  const lastRole = lastMsg?.role;

  useEffect(() => {
    if (!endRef.current) return;
    endRef.current.scrollIntoView({
      behavior: isStreaming ? 'instant' : 'smooth',
      block: 'end',
    });
  }, [lastContent, lastRole, isLoading, messages.length]);

  return (
    <div className="flex-1 space-y-4 overflow-x-hidden overflow-y-auto p-4">
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => {
          const isLastAssistant = idx === messages.length - 1 && msg.role === 'assistant';
          const isActiveStream = isLastAssistant && isStreaming;

          return (
            <motion.div
              key={idx}
              layout="position"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, duration: 0.3 }}
              className="flex flex-col items-start"
            >
              <span className="text-muted-foreground text-sm">
                {msg.role === 'assistant' ? 'NachUI Bot' : 'You'}
              </span>
              <ChatMessage message={msg} isStreaming={isActiveStream} />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {showSuggestions && !isLoading && !isStreaming && (
        <ChatSuggestions onSuggestionClick={onSuggestionClick} />
      )}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
          >
            <ChatLoading />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={endRef} />
    </div>
  );
}
