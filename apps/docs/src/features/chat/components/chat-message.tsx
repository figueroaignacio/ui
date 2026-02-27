import type { Message } from '@/lib/definitions';
import { cn } from '@repo/ui/lib/cn';
import { motion } from 'motion/react';
import { ChatMarkdownContent } from './chat-markdown-content';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div layout="position" className={cn('flex w-full max-w-full gap-3', !isUser && 'mt-2')}>
      <div className="min-w-0 flex-1">
        {isUser ? (
          <motion.p
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="mb-5 text-sm wrap-break-word"
          >
            {message.content}
          </motion.p>
        ) : (
          <div className="relative w-full min-w-0 text-sm">
            {isStreaming ? (
              <p className="text-foreground leading-7 wrap-break-word whitespace-pre-wrap">
                {message.content}
                <motion.span
                  aria-hidden
                  className="ml-0.5 inline-block h-[1em] w-[2px] rounded-sm bg-current align-middle"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                />
              </p>
            ) : (
              <motion.div
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <ChatMarkdownContent content={message.content} />
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
