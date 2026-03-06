import { BulbIcon, CodeIcon, Comment01Icon, SparklesIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
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
      <div>
        <h3 className="text-foreground mb-2 font-semibold">{t('title')}</h3>
        <p className="text-muted-foreground text-sm">{t('subtitle')}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {suggestions.map((suggestion, index) => {
          return (
            <button
              type="button"
              key={index}
              onClick={() => onSuggestionClick(suggestion.text)}
              className="transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="bg-secondary border-border flex cursor-pointer items-center gap-1 rounded-2xl border px-4 py-2">
                <div>
                  <HugeiconsIcon icon={suggestion.icon} size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-left text-sm leading-snug font-medium wrap-break-word">
                    {suggestion.text}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
