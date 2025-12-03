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
  const t = useTranslations('components.chat');

  const disabled = isLoading || !message.trim();

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="bg-muted/30 border-border focus-within:ring-primary/20 flex items-center gap-3 rounded-xl border p-1.5 shadow-sm transition-all focus-within:ring-2">
        <input
          value={message}
          disabled={isLoading}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyPress={onKeyPress}
          placeholder={t('input.placeholder')}
          className="placeholder:text-muted-foreground flex-1 bg-transparent px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
        />
        <motion.button
          type="submit"
          disabled={disabled}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          className="bg-primary text-primary-foreground hover:bg-primary/90 flex h-9 w-9 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </motion.button>
      </div>

      <p className="text-muted-foreground mt-2 px-1 text-xs">{t('messages.helperText')}</p>
    </form>
  );
}
