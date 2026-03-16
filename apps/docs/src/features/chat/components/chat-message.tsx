import { useCopyToClipboard } from '@/features/docs/hooks/use-copy-to-clipboard';
import type { Message } from '@/lib/definitions';
import { Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '@repo/ui/lib/cn';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
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
  const { isCopied, copyToClipboard } = useCopyToClipboard(2000);
  const t = useTranslations('components.chat.messages');

  return (
    <motion.div layout="position" className={cn('flex w-full max-w-full gap-3', !isUser && 'mt-2')}>
      <div className="min-w-0 flex-1">
        {isUser ? (
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={userMessageTransition}
            className="mb-8 flex justify-end"
          >
            <p className="bg-secondary-foreground text-background max-w-[85%] rounded-3xl rounded-tr-sm px-6 py-3.5 text-[15px] leading-relaxed font-medium wrap-break-word shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              {message.content}
            </p>
          </motion.div>
        ) : (
          <div className="group relative mb-8 w-full min-w-0 text-[15px] leading-relaxed text-neutral-200/90">
            <ChatMarkdownContent content={message.content} />
            {isStreaming && !shouldReduceMotion && (
              <motion.span
                aria-hidden
                style={cursorStyle}
                className="ml-0.5 inline-block h-[1em] w-[2px] rounded-sm bg-white align-middle"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            {!isStreaming && (
              <div className="mt-2 flex items-center justify-start opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100 sm:opacity-100 sm:group-hover:opacity-100">
                <button
                  type="button"
                  onClick={() => copyToClipboard(message.content)}
                  disabled={isCopied}
                  className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-neutral-500 transition-colors hover:bg-white/5 hover:text-neutral-300 active:scale-95"
                  title={isCopied ? t('copied') : t('copy')}
                  aria-label={isCopied ? t('copied') : t('copy')}
                >
                  <HugeiconsIcon icon={isCopied ? Tick02Icon : Copy01Icon} size={14} />
                  {isCopied ? t('copied') : t('copy')}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
