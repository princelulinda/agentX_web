'use client';

import { motion } from 'framer-motion';

const FLOATING_POSITIONS = [
  { top: 25, left: 45 },
  { top: 75, left: 35 },
  { top: 45, left: 85 },
  { top: 65, left: 75 },
  { top: 85, left: 65 },
  { top: 35, left: 55 },
  { top: 55, left: 45 },
  { top: 25, left: 75 },
  { top: 75, left: 25 },
  { top: 45, left: 35 },
  { top: 65, left: 15 },
  { top: 15, left: 65 }
].map((pos, index) => ({
  ...pos,
  symbol: ['BTC', 'ETH', 'USDT'][index % 3]
}));

export const FloatingCrypto = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {FLOATING_POSITIONS.map((position, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            top: `${position.top}%`,
            left: `${position.left}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.4, 0.8, 0.4],
            scale: [0.8, 1.2, 0.8],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        >
          <div className="text-sm font-medium text-gray-400">
            {position.symbol}
          </div>
        </motion.div>
      ))}
    </div>
  );
};
