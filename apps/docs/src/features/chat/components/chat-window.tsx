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
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

export function ChatWindow(props: ChatWindowProps) {
  const {
    isOpen,
    messages,
    isLoading,
    messagesEndRef,
    message,
    onMessageChange,
    onSubmit,
    onKeyPress,
    onClose,
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
            className="fixed inset-0 z-9998 bg-white backdrop-blur-md dark:bg-black/60"
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
            className="fixed inset-4 z-9999 flex flex-col overflow-hidden md:inset-auto md:top-1/2 md:left-1/2 md:h-screen md:max-h-[800px] md:w-full md:max-w-4xl md:-translate-x-1/2 md:-translate-y-1/2"
          >
            <ChatHeader onClose={onClose} />
            <div className="flex-1 overflow-y-auto">
              <ChatMessages
                messages={messages}
                isLoading={isLoading}
                messagesEndRef={messagesEndRef}
              />
            </div>
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
