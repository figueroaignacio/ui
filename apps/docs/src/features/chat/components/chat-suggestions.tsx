import { BulbIcon, CodeIcon, Comment01Icon, SparklesIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

interface ChatSuggestionsProps {
  onSuggestionClick: (text: string) => void;
}

export function ChatSuggestions({ onSuggestionClick }: ChatSuggestionsProps) {
  const t = useTranslations('components.chat.suggestions');

  const suggestions = [
    {
      icon: Comment01Icon,
      text: t('howWorks'),
    },
    {
      icon: CodeIcon,
      text: t('technologies'),
    },
    {
      icon: SparklesIcon,
      text: t('features'),
    },
    {
      icon: BulbIcon,
      text: t('getStarted'),
    },
  ];

  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center space-y-5 py-6 text-center">
      <div>
        <h3 className="text-foreground mb-1.5 text-sm font-semibold">{t('title')}</h3>
        <p className="text-muted-foreground text-xs">{t('subtitle')}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-2.5">
        {suggestions.map((suggestion, index) => (
          <motion.button
            type="button"
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.25 }}
            onClick={() => onSuggestionClick(suggestion.text)}
            className="group border-border/50 bg-secondary/20 hover:border-border hover:bg-secondary/40 flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2 transition-colors"
          >
            <HugeiconsIcon
              icon={suggestion.icon}
              size={14}
              className="text-muted-foreground group-hover:text-foreground transition-colors"
            />
            <p className="text-foreground/70 group-hover:text-foreground text-left text-[13px] leading-snug font-medium transition-colors">
              {suggestion.text}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
