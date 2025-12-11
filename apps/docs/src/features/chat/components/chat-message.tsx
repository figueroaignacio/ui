// Components
import { motion } from 'motion/react';
import { ChatMarkdownContent } from './chat-markdown-content';

// Types
import type { Message } from '@/lib/definitions';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex w-full max-w-full gap-3"
    >
      <div className="w-full max-w-full min-w-0 overflow-hidden rounded-2xl py-2.5">
        {isUser ? (
          <p className="text-sm wrap-break-word">{message.content}</p>
        ) : (
          <div className="w-full min-w-0 text-sm">
            <ChatMarkdownContent content={message.content} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
