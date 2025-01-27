'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const headlines = [
  {
    title: "Maximize Your USDT: Up to 1.2% Daily Gains with AgentX",
    subtitle: "The AI that never sleeps, for profits that never stop"
  },
  {
    title: "Turn 100 USDT into 136 USDT in 30 Days with Our AI Agent",
    subtitle: "The power of artificial intelligence at the service of your wealth"
  },
  {
    title: "Your Money Works 24/7: +5% to +36% Monthly Thanks to Our AI",
    subtitle: "While you sleep, AgentX generates your profits"
  },
  {
    title: "Daily Gains of 0.5% to 1.2%: The Magic of AI AgentX",
    subtitle: "Join the investors who earn while they sleep"
  },
  {
    title: "36% Monthly? Our AI Agent Makes the Impossible Possible",
    subtitle: "The revolution of automated trading is here"
  }
];


export const HeadlineRotator = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % headlines.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      className="h-32 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {headlines.map((headline, index) => (
        <motion.div
          key={index}
          className={`absolute w-full text-center transition-opacity duration-500 ${
            currentIndex === index ? "opacity-100" : "opacity-0"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: currentIndex === index ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-500">
            {headline.title}
          </h1>
          <p className="text-xl text-gray-400">
            {headline.subtitle}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
};
