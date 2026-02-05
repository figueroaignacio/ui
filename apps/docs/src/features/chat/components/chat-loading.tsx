import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export function ChatLoading() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-start space-y-1"
    >
      <span className="text-muted-foreground text-sm">NachUI Bot</span>
      <div className="flex items-center gap-2 rounded-lg border">
        <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
      </div>
    </motion.div>
  );
}
