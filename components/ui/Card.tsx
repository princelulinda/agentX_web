'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export default function Card({ children, className = '', animate = true }: CardProps) {
  const baseClasses = 'bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6';
  
  if (!animate) {
    return (
      <div className={`${baseClasses} ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
}
