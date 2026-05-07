import { Loading03Icon, SentIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';

interface ChatInputProps {
  message: string;
  isLoading: boolean;
  onMessageChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function ChatInput(props: ChatInputProps) {
  const { message, isLoading, onMessageChange, onSubmit, onKeyPress } = props;
  const t = useTranslations('components.chat');
  const shouldReduceMotion = useReducedMotion();

  const disabled = isLoading || !message.trim();
  const hoverScale = shouldReduceMotion || disabled ? 1 : 1.05;
  const tapScale = shouldReduceMotion || disabled ? 1 : 0.95;

  return (
    <form
      onSubmit={onSubmit}
      className="bg-background/50 border-border/40 relative z-10 w-full border-t px-6 py-5 backdrop-blur-md before:pointer-events-none before:absolute before:inset-0 before:-z-10"
    >
      <div className="bg-background border-border/50 focus-within:border-foreground/30 focus-within:ring-foreground/5 flex items-center gap-3 rounded-[32px] border p-1.5 shadow-[0_2px_14px_rgba(0,0,0,0.04),inset_0_0_0_1px_rgba(255,255,255,0.02)] transition-all duration-500 focus-within:ring-4">
        <input
          value={message}
          disabled={isLoading}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={t('input.placeholder')}
          className="placeholder:text-muted-foreground/70 flex-1 bg-transparent px-5 py-3 text-[15px] outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={disabled}
          whileHover={{ scale: hoverScale }}
          whileTap={{ scale: tapScale }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="bg-foreground text-background hover:bg-foreground/90 flex h-11 w-11 items-center justify-center rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.1)] transition-colors disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0_4px_14px_rgba(255,255,255,0.1)]"
        >
          {isLoading ? (
            <HugeiconsIcon icon={Loading03Icon} size={18} className="animate-spin" />
          ) : (
            <HugeiconsIcon icon={SentIcon} size={18} />
          )}
        </motion.button>
      </div>
      <p className="text-muted-foreground mt-2 hidden px-1 text-xs lg:block">
        {t('messages.helperText')}
      </p>
    </form>
  );
}
