// Hooks
import { useTranslations } from 'next-intl';

// Components
import { motion } from 'framer-motion';
import { Loader2, Send } from 'lucide-react';

interface ChatInputProps {
  message: string;
  isLoading: boolean;
  onMessageChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function ChatInput(props: ChatInputProps) {
  const { message, isLoading, onMessageChange, onSubmit, onKeyPress } = props;
  const t = useTranslations('components.chat.input');

  const disabled = isLoading || !message.trim();

  return (
    <form onSubmit={onSubmit}>
      <div className="mx-3 mb-2 flex gap-2 md:mx-0 md:mb-0">
        <input
          value={message}
          disabled={isLoading}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={t('placeholder')}
          className="bg-card border-border focus:ring-foreground/20 placeholder:text-muted-foreground flex-1 resize-none rounded-xl border px-4 text-sm transition focus:ring-1 focus:outline-none disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={disabled}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-foreground text-background flex h-10 w-10 items-center justify-center rounded-xl disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </motion.button>
      </div>
    </form>
  );
}
