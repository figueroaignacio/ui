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
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="chat-backdrop fixed inset-0 z-9998 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="pointer-events-auto fixed inset-0 z-9999 flex flex-col md:top-1/2 md:left-1/2 md:h-[680px] md:w-[580px] md:-translate-x-1/2 md:-translate-y-1/2"
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
