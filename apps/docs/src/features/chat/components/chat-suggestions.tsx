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
              <div className="flex cursor-pointer items-center gap-3 rounded-2xl border border-white/8 bg-white/3 px-5 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/8">
                <div
                  className={`rounded-xl bg-linear-to-br p-2 ${suggestion.gradient} bg-opacity-20`}
                >
                  <HugeiconsIcon icon={suggestion.icon} className="size-4 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-left text-sm leading-snug font-medium wrap-break-word text-white/80">
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
