import type { Message } from '@/lib/definitions';
import { cn } from '@repo/ui/lib/cn';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { RefObject } from 'react';
import { useEffect } from 'react';
import { ChatError } from './chat-error';
import { ChatLoading } from './chat-loading';
import { ChatMessage } from './chat-message';
import { ChatSuggestions } from './chat-suggestions';

interface ChatMessagesProps {
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  error: Error | undefined;
  endRef: RefObject<HTMLDivElement>;
  onSuggestionClick: (text: string) => void;
}

const messageRowVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
} as const;

const messageRowTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 28,
  duration: 0.3,
};

const messageRowStyle = { willChange: 'opacity, transform' } as const;

const loadingVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
} as const;

const loadingTransition = { duration: 0.2 };

export function ChatMessages({
  messages,
  isLoading,
  isStreaming,
  error,
  endRef,
  onSuggestionClick,
}: ChatMessagesProps) {
  const shouldReduceMotion = useReducedMotion();
  const showSuggestions = messages.length === 1 && messages[0].role === 'assistant';

  const lastMsg = messages[messages.length - 1];
  const lastContent = lastMsg?.content ?? '';
  const lastRole = lastMsg?.role;

  useEffect(() => {
    if (!endRef.current) return;
    endRef.current.scrollIntoView({
      behavior: shouldReduceMotion || isStreaming ? 'instant' : 'smooth',
      block: 'end',
    });
  }, [lastContent, lastRole, isLoading, messages.length, isStreaming, shouldReduceMotion, endRef]);

  return (
    <div className="flex-1 space-y-6 overflow-x-hidden overflow-y-auto px-6 py-2">
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => {
          const isLastAssistant = idx === messages.length - 1 && msg.role === 'assistant';
          const isActiveStream = isLastAssistant && isStreaming;

          return (
            <motion.div
              key={idx}
              layout="position"
              style={messageRowStyle}
              variants={messageRowVariants}
              initial="initial"
              animate="animate"
              transition={messageRowTransition}
              className={cn('flex flex-col', msg.role === 'user' ? 'items-end' : 'items-start')}
            >
              <span className="mb-1.5 text-[10px] font-bold tracking-[0.15em] uppercase">
                {msg.role === 'assistant' ? '' : 'You'}
              </span>
              <ChatMessage message={msg} isStreaming={isActiveStream} />
            </motion.div>
          );
        })}
      </AnimatePresence>

      {error && !isLoading && !isStreaming && (
        <motion.div
          key="error"
          style={messageRowStyle}
          variants={loadingVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={loadingTransition}
        >
          <ChatError />
        </motion.div>
      )}

      {showSuggestions && !isLoading && !isStreaming && (
        <ChatSuggestions onSuggestionClick={onSuggestionClick} />
      )}

      <AnimatePresence>
        {isLoading && !isStreaming && (
          <motion.div
            key="loading"
            style={messageRowStyle}
            variants={loadingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={loadingTransition}
          >
            <ChatLoading />
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={endRef} />
    </div>
  );
}
