// Components
import { AnimatePresence, motion } from 'framer-motion';
import { ChatHeader } from './chat-header';
import { ChatInput } from './chat-input';
import { ChatMessages } from './chat-messages';

// Types
import type { Message } from '@/lib/definitions';

interface ChatWindowProps {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  message: string;
  onMessageChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onClose: () => void;
}

export function ChatWindow({
  isOpen,
  messages,
  isLoading,
  messagesEndRef,
  message,
  onMessageChange,
  onSubmit,
  onKeyPress,
  onClose,
}: ChatWindowProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-1000 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="md:rounded-2x fixed inset-0 z-1000 flex h-full w-full flex-col overflow-hidden rounded-none border-0 md:inset-auto md:top-1/2 md:left-1/2 md:h-[680px] md:w-[580px] md:-translate-x-1/2 md:-translate-y-1/2 md:transform"
          >
            <ChatHeader />
            <ChatMessages
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
            />
            <ChatInput
              message={message}
              isLoading={isLoading}
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
