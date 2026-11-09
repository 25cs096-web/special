import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audio } from '../../utils/audio';

interface BalloonPopRevealProps {
  balloonColor?: 'pink' | 'gold' | 'blue' | 'lavender';
  balloonText?: string;
  delayMs?: number;
  autoPop?: boolean;
  autoPopDelayMs?: number;
  onRevealed?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const BalloonPopReveal: React.FC<BalloonPopRevealProps> = ({
  balloonColor = 'pink',
  balloonText = 'Tap to Pop 🎈',
  delayMs = 400,
  autoPop = false,
  autoPopDelayMs = 2200,
  onRevealed,
  children,
  className = '',
}) => {
  const [isPopped, setIsPopped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delayMs);
    return () => clearTimeout(timer);
  }, [delayMs]);

  useEffect(() => {
    if (autoPop && isVisible && !isPopped) {
      const popTimer = setTimeout(() => {
        handlePop();
      }, autoPopDelayMs);
      return () => clearTimeout(popTimer);
    }
  }, [autoPop, isVisible, isPopped, autoPopDelayMs]);

  const handlePop = () => {
    if (isPopped) return;
    audio.playBalloonPop();
    setIsPopped(true);
    if (onRevealed) onRevealed();
  };

  const colorStyles = {
    pink: 'from-[#FFB6D5] to-[#FFD6E7] border-[#FFA0C8]/50 shadow-[0_12px_28px_rgba(255,182,213,0.5)]',
    gold: 'from-[#FFD15C] to-[#FFF3C4] border-[#E8C77B]/50 shadow-[0_12px_28px_rgba(232,199,123,0.5)]',
    blue: 'from-[#BDE7FF] to-[#E0F2FE] border-[#93C5FD]/50 shadow-[0_12px_28px_rgba(189,231,255,0.5)]',
    lavender: 'from-[#E8DFFF] to-[#F3E8FF] border-[#D8B4FE]/50 shadow-[0_12px_28px_rgba(232,223,255,0.5)]',
  };

  return (
    <div className={`relative flex flex-col items-center justify-center my-3 ${className}`}>
      <AnimatePresence mode="wait">
        {!isPopped && isVisible ? (
          <motion.div
            key="balloon"
            initial={{ y: 50, scale: 0.6, opacity: 0 }}
            animate={{ y: [0, -10, 0], scale: 1, opacity: 1 }}
            exit={{ scale: [1, 1.3, 0], opacity: [1, 0.8, 0], filter: 'blur(4px)' }}
            transition={{
              y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
              scale: { duration: 0.5 },
              opacity: { duration: 0.4 },
            }}
            onClick={handlePop}
            className="cursor-pointer group flex flex-col items-center select-none"
          >
            {/* 3D Balloon Body */}
            <div
              className={`relative w-28 h-36 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-br ${colorStyles[balloonColor]} flex flex-col items-center justify-center p-3 text-center transition-transform group-hover:scale-105 group-active:scale-95`}
              style={{
                boxShadow:
                  balloonColor === 'gold'
                    ? 'inset -6px -8px 16px rgba(184, 134, 11, 0.35), inset 6px 8px 16px rgba(255, 255, 255, 0.85), 0 16px 32px rgba(232, 199, 123, 0.4)'
                    : 'inset -6px -8px 16px rgba(0, 0, 0, 0.08), inset 6px 8px 16px rgba(255, 255, 255, 0.75), 0 16px 32px rgba(255, 182, 213, 0.35)',
              }}
            >
              {/* Glossy reflection highlights */}
              <div className="absolute top-3 left-4 w-4 h-7 rounded-full bg-white/70 blur-[1px] -rotate-12" />
              <div className="absolute top-11 left-3 w-2 h-2 rounded-full bg-white/60 blur-[0.5px]" />

              <span className="text-xs font-semibold tracking-wide text-[#343B63] bg-white/75 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-xs">
                {balloonText}
              </span>

              {/* Balloon knot & wavy ribbon */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-2 bg-[#FF80AB] rounded-sm" />
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1.5px] h-10 bg-gradient-to-b from-[#FF80AB]/80 to-transparent" />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[11px] font-medium text-[#FF80AB] mt-3 tracking-wider uppercase"
            >
              ✨ Click to Pop ✨
            </motion.p>
          </motion.div>
        ) : isPopped ? (
          <motion.div
            key="revealed-content"
            initial={{ scale: 0.8, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 22 }}
            className="w-full flex justify-center"
          >
            {children}
          </motion.div>
        ) : (
          <div className="h-28 w-28 opacity-0" />
        )}
      </AnimatePresence>
    </div>
  );
};
