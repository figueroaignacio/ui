'use client';

import { motion } from 'motion/react';

export function LandingBackground() {
  return (
    <div className="bg-background absolute inset-0 -z-10 overflow-hidden">
      <div className="bg-grid-pattern absolute inset-0" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="from-primary/20 to-secondary/20 absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-linear-to-r blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-[-20%] bottom-[-20%] h-[600px] w-[600px] rounded-full bg-linear-to-r from-blue-500/20 to-purple-500/20 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute top-[40%] left-[60%] h-[400px] w-[400px] rounded-full bg-linear-to-r from-cyan-500/20 to-emerald-500/20 blur-[90px]"
      />
    </div>
  );
}
