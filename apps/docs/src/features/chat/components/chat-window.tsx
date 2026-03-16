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
  messagesEndRef: React.RefObject<HTMLDivElement>;
  message: string;
  onMessageChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClose: () => void;
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
    messagesEndRef,
    message,
    onMessageChange,
    onSubmit,
    onKeyPress,
    onClose,
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
            className="fixed inset-0 z-9998 px-12 backdrop-blur-xs"
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
            className="bg-card border-border fixed inset-4 z-9999 flex flex-col overflow-hidden rounded-lg border shadow-2xl backdrop-blur-3xl md:inset-auto md:top-4 md:right-4 md:h-[calc(100dvh-2rem)] md:w-[400px] lg:w-[550px]"
          >
            <ChatHeader onClose={onClose} />
            <div className="flex-1 overflow-y-auto">
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                isStreaming={isStreaming}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
