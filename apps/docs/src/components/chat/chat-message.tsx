// Components
import { motion } from 'framer-motion';
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
      className="flex gap-3"
    >
      <div className="max-w-[75%] rounded-2xl py-2.5">
        {isUser ? (
          <p className="text-sm">{message.content}</p>
        ) : (
          <div className="text-sm">
            <ChatMarkdownContent content={message.content} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
