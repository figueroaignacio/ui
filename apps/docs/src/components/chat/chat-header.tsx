// Components
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface ChatHeaderProps {
  onClose?: () => void;
}

export function ChatHeader({ onClose }: ChatHeaderProps) {
  return (
    <div>
      {onClose && (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="bg-muted hover:bg-muted/80 flex h-8 w-8 items-center justify-center rounded-full transition md:hidden"
          aria-label="Close chat"
        >
          <X className="text-foreground h-4 w-4" />
        </motion.button>
      )}
    </div>
  );
}
