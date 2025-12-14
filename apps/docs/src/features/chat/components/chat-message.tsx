// Hooks
import { useEffect } from 'react';
import { useTypewriter } from '../hooks/use-typewriter';

// Components
import { motion, type Variants } from 'motion/react';
import { ChatMarkdownContent } from './chat-markdown-content';

// Utils
import { cn } from '@repo/ui/lib/cn';

// Types
import type { Message } from '@/lib/definitions';

interface ChatMessageProps {
  message: Message;
  shouldAnimate: boolean;
  onType?: () => void;
}

const messageVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
    filter: 'blur(8px)',
    willChange: 'transform, opacity, filter',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      filter: { duration: 0.4, ease: 'easeOut' },
      opacity: { duration: 0.2 },
    },
  },
};

export function ChatMessage({ message, shouldAnimate, onType }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const enableTypewriter = !isUser && shouldAnimate;
  const { displayedText, isComplete } = useTypewriter(message.content, 5, enableTypewriter);

  useEffect(() => {
    if (enableTypewriter && !isComplete && onType) {
      onType();
    }
  }, [displayedText, enableTypewriter, isComplete, onType]);

  return (
    <motion.div
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      layout="position"
      className={cn('flex w-full max-w-full gap-3', !isUser && 'mt-2')}
    >
      <div>
        {isUser ? (
          <p className="mb-5 text-sm wrap-break-word">{message.content}</p>
        ) : (
          <div className="relative w-full min-w-0 text-sm">
            <ChatMarkdownContent content={displayedText} />
          </div>
        )}
      </div>
    </motion.div>
  );
}
