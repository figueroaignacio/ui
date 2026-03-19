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
      className="relative z-10 w-full px-4 py-4 before:pointer-events-none before:absolute before:inset-0 before:-z-10"
    >
      <div className="bg-secondary border-border focus-within:border-border focus-within:ring-border flex items-center gap-3 rounded-4xl border p-1.5 transition-all duration-300">
        <input
          value={message}
          disabled={isLoading}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={t('input.placeholder')}
          className="flex-1 bg-transparent px-4 py-2.5 text-[15px] outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={disabled}
          whileHover={{ scale: hoverScale }}
          whileTap={{ scale: tapScale }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-[0_2px_10px_rgba(255,255,255,0.1)] transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
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
