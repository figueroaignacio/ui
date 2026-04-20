import type { Message } from '@/lib/definitions';
import { AnimatePresence, motion } from 'motion/react';
import { ChatHeader } from './chat-header';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';

interface ChatWindowProps {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  isStreaming: boolean;
  error: Error | undefined;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  message: string;
  onMessageChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClose: () => void;
  onReset: () => void;
  onSuggestionClick: (text: string) => void;
}

const backdropVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
} as const;

const backdropTransition = { duration: 0.2 };

const windowVariants = {
  initial: { opacity: 0, x: 'calc(100% + 2rem)' },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 'calc(100% + 2rem)' },
} as const;

const windowTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
};

const backdropStyle = { willChange: 'opacity' } as const;
const windowStyle = { willChange: 'opacity, transform' } as const;

export function ChatWindow(props: ChatWindowProps) {
  const {
    isOpen,
    messages,
    isLoading,
    isStreaming,
    error,
    messagesEndRef,
    message,
    onMessageChange,
    onSubmit,
    onKeyPress,
    onClose,
    onReset,
    onSuggestionClick,
  } = props;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            style={backdropStyle}
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={backdropTransition}
            className="bg-background/50 fixed inset-0 z-9998 px-12 backdrop-blur-xs"
            onClick={onClose}
          />
          <motion.div
            key="chat-window"
            style={windowStyle}
            variants={windowVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={windowTransition}
            className="bg-background/95 md:border-border/50 fixed inset-0 z-9999 flex flex-col overflow-hidden rounded-none border-0 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.6)] backdrop-blur-3xl md:top-auto md:right-6 md:bottom-6 md:left-auto md:h-[calc(100dvh-3rem)] md:rounded-[24px] md:border md:ring-1 md:ring-white/5 lg:top-6 lg:bottom-auto lg:w-[650px]"
          >
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
              }}
            />
            <div className="from-primary/5 via-primary/2 pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-linear-to-b to-transparent" />

            <div className="relative z-10 flex h-full flex-col">
              <ChatHeader onClose={onClose} onReset={onReset} />

              <div className="flex-1 overflow-y-auto">
                <ChatMessages
                  messages={messages}
                  isLoading={isLoading}
                  isStreaming={isStreaming}
                  error={error}
                  endRef={messagesEndRef}
                  onSuggestionClick={onSuggestionClick}
                />
              </div>
              <ChatInput
                message={message}
                isLoading={isLoading || isStreaming}
                onMessageChange={onMessageChange}
                onSubmit={onSubmit}
                onKeyPress={onKeyPress}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
