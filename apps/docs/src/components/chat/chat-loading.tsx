// Components
import { motion } from 'framer-motion';
import { BotMessageSquare, Loader2 } from 'lucide-react';

export function ChatLoading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full">
        <BotMessageSquare className="text-foreground h-6 w-6" />
      </div>
      <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-2.5">
        <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
      </div>
    </motion.div>
  );
}
