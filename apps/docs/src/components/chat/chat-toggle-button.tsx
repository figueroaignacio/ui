// Components
import { AnimatePresence, motion } from 'framer-motion';
import { BotMessageSquare } from 'lucide-react';

interface ChatToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function ChatToggleButton({ isOpen, onClick }: ChatToggleButtonProps) {
  return (
    <motion.button onClick={onClick} className="border-border rounded-xl border">
      <AnimatePresence mode="wait">
        <motion.div className="flex items-center gap-3 px-3 py-2">
          <BotMessageSquare className="size-4" />
          Ask AI
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
