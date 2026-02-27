import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

const dotStyle = { willChange: 'opacity' } as const;

function getDotTransition(dot: number) {
  return {
    duration: 0.8,
    repeat: Infinity,
    repeatType: 'reverse' as const,
    delay: dot * 0.2,
  };
}

const containerVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
} as const;

export function ChatLoading() {
  const t = useTranslations('components.chat.messages');

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className="flex flex-col items-start space-y-2"
    >
      <span className="text-muted-foreground text-sm font-medium">NachUI Bot</span>
      <div className="flex animate-pulse items-center gap-1 rounded-xl text-sm backdrop-blur-sm">
        <span className="text-muted-foreground">{t('thinking')}</span>
        <span className="flex gap-[2px]">
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              style={dotStyle}
              className="bg-muted-foreground h-1 w-1 rounded-full"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: 1 }}
              transition={getDotTransition(dot)}
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}
