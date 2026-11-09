import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audio } from '../../utils/audio';

interface ButterflyCardRevealProps {
  message: string;
  delayMs?: number;
  butterflyColor?: string;
  className?: string;
}

export const ButterflyCardReveal: React.FC<ButterflyCardRevealProps> = ({
  message,
  delayMs = 500,
  className = '',
}) => {
  const [hasArrived, setHasArrived] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasArrived(true);
      audio.playChime();
    }, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return (
    <div className={`relative flex flex-col items-center justify-center my-3 ${className}`}>
      <AnimatePresence>
        {hasArrived && (
          <motion.div
            initial={{ opacity: 0, x: -60, y: -25, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 220,
              damping: 20,
              duration: 1.2,
            }}
            className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl glass-card border border-[#BDE7FF]/60 shadow-[0_8px_24px_rgba(189,231,255,0.35)]"
          >
            {/* Animated Butterfly Carrying Ribbon */}
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [0, 4, -4, 0],
              }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
              className="text-2xl sm:text-3xl shrink-0 select-none drop-shadow-sm"
            >
              🦋
            </motion.div>

            <div className="flex flex-col">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#87CEEB]">
                Delivered by Butterfly
              </span>
              <p className="text-sm sm:text-base font-medium text-[#343B63] italic">
                "{message}"
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FlowerBloomRevealProps {
  message: string;
  flowerEmoji?: string;
  delayMs?: number;
  className?: string;
}

export const FlowerBloomReveal: React.FC<FlowerBloomRevealProps> = ({
  message,
  flowerEmoji = '🌸',
  delayMs = 400,
  className = '',
}) => {
  const [isBloomed, setIsBloomed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBloomed(true);
      audio.playFlowerBloom();
    }, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return (
    <div className={`relative flex flex-col items-center justify-center my-3 ${className}`}>
      <AnimatePresence>
        {isBloomed ? (
          <motion.div
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl glass-card border border-[#FFD6E7] shadow-[0_8px_24px_rgba(255,182,213,0.3)]"
          >
            <motion.span
              animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              className="text-2xl sm:text-3xl shrink-0 select-none"
            >
              {flowerEmoji}
            </motion.span>
            <div className="flex flex-col">
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#FF80AB]">
                In Full Bloom
              </span>
              <p className="text-sm sm:text-base font-medium text-[#343B63]">
                {message}
              </p>
            </div>
          </motion.div>
        ) : (
          <div className="h-14 w-14 opacity-0" />
        )}
      </AnimatePresence>
    </div>
  );
};

interface HeartRiseRevealProps {
  message: string;
  delayMs?: number;
  icon?: string;
  className?: string;
}

export const HeartRiseReveal: React.FC<HeartRiseRevealProps> = ({
  message,
  delayMs = 300,
  icon = '✨',
  className = '',
}) => {
  const [hasRisen, setHasRisen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasRisen(true);
      audio.playChime();
    }, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  return (
    <div className={`relative flex flex-col items-center justify-center my-3 ${className}`}>
      <AnimatePresence>
        {hasRisen && (
          <motion.div
            initial={{ y: 35, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl glass-card border border-[#E8C77B]/60 shadow-[0_8px_24px_rgba(232,199,123,0.3)]"
          >
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="text-2xl sm:text-3xl shrink-0 select-none text-[#E8C77B]"
            >
              {icon}
            </motion.span>
            <p className="text-sm sm:text-base font-medium text-[#343B63]">
              {message}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
