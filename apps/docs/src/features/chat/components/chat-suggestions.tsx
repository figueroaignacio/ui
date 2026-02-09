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
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: CodeIcon,
      text: t('technologies'),
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: SparklesIcon,
      text: t('features'),
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: BulbIcon,
      text: t('getStarted'),
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  return (
    <div className="flex flex-col space-y-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-foreground mb-2 font-semibold">{t('title')}</h3>
        <p className="text-muted-foreground text-sm">{t('subtitle')}</p>
      </motion.div>
      <div className="flex flex-wrap gap-3">
        {suggestions.map((suggestion, index) => {
          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onSuggestionClick(suggestion.text)}
            >
              <div className="border-border bg-card flex cursor-pointer items-center gap-3 rounded-full border px-5 py-3 transition-transform duration-75 hover:scale-[1.02] active:scale-[0.98]">
                <div>
                  <HugeiconsIcon icon={suggestion.icon} className="size-3" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-foreground text-left text-xs leading-snug font-medium wrap-break-word">
                    {suggestion.text}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
