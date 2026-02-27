import type { Message } from '@/lib/definitions';
import { cn } from '@repo/ui/lib/cn';
import { motion, useReducedMotion } from 'motion/react';
import { ChatMarkdownContent } from './chat-markdown-content';

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
}

const userMessageTransition = {
  type: 'spring' as const,
  stiffness: 320,
  damping: 26,
};

const markdownRevealTransition = { duration: 0.4 };
const cursorStyle = { willChange: 'opacity' } as const;

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div layout="position" className={cn('flex w-full max-w-full gap-3', !isUser && 'mt-2')}>
      <div className="min-w-0 flex-1">
        {isUser ? (
          <motion.p
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={userMessageTransition}
            className="mb-5 text-sm wrap-break-word"
          >
            {message.content}
          </motion.p>
        ) : (
          <div className="relative w-full min-w-0 text-sm">
            {isStreaming ? (
              <p className="text-foreground leading-7 wrap-break-word whitespace-pre-wrap">
                {message.content}
                {!shouldReduceMotion && (
                  <motion.span
                    aria-hidden
                    style={cursorStyle}
                    className="ml-0.5 inline-block h-[1em] w-[2px] rounded-sm bg-current align-middle"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </p>
            ) : (
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0.6 }}
                animate={{ opacity: 1 }}
                transition={markdownRevealTransition}
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
