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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="dark:bg-background/80 fixed inset-0 z-9998 bg-white backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
            className="fixed inset-4 z-9999 flex flex-col md:inset-auto md:top-1/2 md:left-1/2 md:h-screen md:max-h-[800px] md:w-full md:max-w-2xl md:-translate-x-1/2 md:-translate-y-1/2"
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
