import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BalloonPopReveal } from '../reveals/BalloonPopReveal';
import { audio } from '../../utils/audio';
import { fireGiftConfetti } from '../../utils/confetti';
import { Sparkles, Gift, ArrowRight } from 'lucide-react';

interface Page10SecretGiftProps {
  onNext: () => void;
}

export const Page10SecretGift: React.FC<Page10SecretGiftProps> = ({ onNext }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [teddyEntered, setTeddyEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTeddyEntered(true);
      audio.playChime();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenGift = () => {
    if (isOpened) return;
    audio.playGiftOpen();
    setIsOpened(true);
    fireGiftConfetti();
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-6 max-w-2xl mx-auto text-center z-10">
      {/* Kicker badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#E8C77B]/60 text-xs font-bold tracking-widest text-[#E8C77B] uppercase shadow-xs select-none"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
        <span>Special Surprise · The Hidden Gift</span>
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
      </motion.div>

      {/* Tiny Animated Teddy Bear with Flower */}
      <AnimatePresence>
        {teddyEntered && !isOpened && (
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, type: 'spring' }}
            className="flex items-center gap-3 p-2.5 px-5 rounded-full bg-white/90 border border-[#FFD6E7] shadow-sm mb-2 select-none"
          >
            <motion.div
              animate={{ rotate: [0, 6, -6, 0], y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2.2 }}
              className="text-2xl flex items-center"
            >
              🧸 <span className="text-lg -ml-1">🌸</span>
            </motion.div>
            <div className="text-left">
              <span className="text-[10px] font-bold text-[#FF80AB] uppercase tracking-wider block">
                Little Bear's Clue
              </span>
              <p className="text-xs font-semibold text-[#343B63]">
                “Something truly special is waiting inside! 👉”
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Balloon floats above the box and pops */}
      {!isOpened && (
        <BalloonPopReveal
          balloonColor="gold"
          balloonText="Gift Balloon 🎈"
          delayMs={300}
          className="my-1"
        >
          <div className="p-2.5 px-6 rounded-2xl glass-card border border-[#E8C77B]/70 max-w-sm mx-auto shadow-xs">
            <p className="text-xs sm:text-sm font-medium text-[#343B63] italic">
              “A little surprise is waiting for you...”
            </p>
          </div>
        </BalloonPopReveal>
      )}

      {/* Premium Realistic Blush-Pink Gift Box with Emerging Message Animation */}
      <div className="relative w-full max-w-md my-4 flex flex-col items-center justify-center">
        {/* Ambient Warm Golden Beam rising up when opened */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-[#FFE082]/40 via-[#FFD6E7]/30 to-transparent rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
            isOpened ? 'opacity-100' : 'opacity-30'
          }`}
        />

        {/* =========================================================================
            CRITICAL REQUIREMENT:
            The exact message "Mm....✨" MUST appear in the UPPER PART OF THE OPEN GIFT BOX,
            emerging directly from the top opening into the golden light beam!
            ========================================================================= */}
        <div className="relative w-full flex flex-col items-center select-none pt-2 pb-6">
          <AnimatePresence>
            {isOpened && (
              <motion.div
                initial={{ opacity: 0, y: 70, scale: 0.6 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 1.1,
                  type: 'spring',
                  stiffness: 180,
                  damping: 18,
                  delay: 0.35,
                }}
                className="z-30 w-full max-w-sm px-4 mb-[-36px] flex flex-col items-center pointer-events-auto"
              >

                {/* THE FLOATING REVEAL CARD EMERGING FROM UPPER BOX OPENING */}
                <div className="w-full p-6 sm:p-7 rounded-[28px] bg-gradient-to-b from-white via-[#FFF8FA] to-[#FFF0F5] border-2 border-[#E8C77B] shadow-[0_15px_40px_rgba(232,199,123,0.45),0_0_30px_rgba(255,255,255,0.9)] flex flex-col items-center">
                  {/* EXACT REQUIRED TEXT */}
                  <motion.h2
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                    className="text-4xl sm:text-5xl font-black font-playfair text-[#FF4081] tracking-wide mb-2 drop-shadow-sm"
                  >
                    Mm....✨
                  </motion.h2>

                  <p className="text-base sm:text-lg font-bold text-[#343B63] font-playfair italic leading-relaxed text-center">
                    “Keep smiling. Keep dreaming. Keep shining.”
                  </p>

                  <div className="mt-3 flex items-center justify-center gap-2 text-xs text-[#E8C77B]">
                    <span>✨</span>
                    <span className="font-semibold text-[#343B63]/70 uppercase tracking-widest text-[10px]">
                      A Wish From The Heart
                    </span>
                    <span>✨</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D Wrapped Gift Box Assembly */}
          <div className="relative w-56 sm:w-64 h-52 sm:h-56 flex flex-col items-center justify-end z-10 mt-6">
            {/* Box Lid with Satin Bow (Lifts and rotates aside with spring physics) */}
            <motion.div
              animate={
                isOpened
                  ? { y: -110, x: -75, rotate: -28, opacity: 0.95 }
                  : { y: [0, -4, 0], x: 0, rotate: [0, 0.5, -0.5, 0], opacity: 1 }
              }
              transition={
                isOpened
                  ? { duration: 1.1, type: 'spring', damping: 14, stiffness: 120 }
                  : { repeat: Infinity, duration: 3.2, ease: 'easeInOut' }
              }
              className="absolute top-4 z-20 w-60 sm:w-68 h-14 rounded-t-2xl bg-gradient-to-r from-[#FFB6D5] via-[#FFD6E7] to-[#FFB6D5] border-2 border-white shadow-[0_10px_25px_rgba(255,182,213,0.7)] flex items-center justify-center cursor-pointer"
              onClick={!isOpened ? handleOpenGift : undefined}
            >
              {/* Large realistic fabric ribbon bow with natural breathing */}
              <div className="absolute -top-7 flex items-center justify-center animate-pulse">
                <span className="text-4xl drop-shadow-md select-none">🎀</span>
              </div>
              {/* Baby-blue satin ribbon wrap */}
              <div className="w-9 h-full bg-gradient-to-r from-[#BDE7FF] to-[#87CEEB] border-x border-white/60 shadow-xs" />
            </motion.div>

            {/* Gift Box Base with Satin Ribbons & Internal Golden Radiance */}
            <div className="relative w-56 sm:w-64 h-40 rounded-b-3xl bg-gradient-to-br from-[#FFD6E7] via-[#FFF0F6] to-[#FFB6D5] border-2 border-white shadow-[0_20px_50px_rgba(255,182,213,0.5)] flex items-center justify-center overflow-hidden">
              {/* Vertical & Horizontal Baby-Blue Satin Ribbons */}
              <div className="absolute inset-y-0 w-9 bg-gradient-to-r from-[#BDE7FF] to-[#87CEEB] border-x border-white/60" />
              <div className="absolute inset-x-0 h-9 bg-gradient-to-b from-[#BDE7FF] to-[#87CEEB] border-y border-white/60" />

              {/* Radiant light eruption from inside the open box */}
              {isOpened && (
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  style={{ transformOrigin: 'bottom center' }}
                  className="absolute inset-0 bg-gradient-to-t from-[#FFE082]/90 via-white/85 to-transparent flex items-center justify-center z-10"
                >
                  <span className="text-3xl animate-spin text-[#E8C77B]" style={{ animationDuration: '6s' }}>
                    ✦
                  </span>
                </motion.div>
              )}
            </div>

            {/* Marble Gift Pedestal Platform */}
            <div className="w-64 sm:w-76 h-5 rounded-full bg-gradient-to-r from-[#E8C77B]/80 via-white to-[#E8C77B]/80 shadow-[0_12px_28px_rgba(52,59,99,0.2)] border border-white -mt-2.5 z-0" />
          </div>

          {/* Trigger Button: Open Gift vs Continue */}
          {!isOpened ? (
            <button
              onClick={handleOpenGift}
              className="mt-6 px-8 py-3.5 rounded-2xl glass-btn font-bold text-base text-[#343B63] flex items-center gap-2.5 cursor-pointer shadow-lg group hover:scale-105 active:scale-95 transition-all"
            >
              <Gift className="w-5 h-5 text-[#FF4081] group-hover:scale-110 transition-transform" />
              <span>OPEN YOUR GIFT 🎁</span>
            </button>
          ) : (
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              onClick={() => {
                audio.playPageTransition();
                onNext();
              }}
              className="mt-6 px-8 py-3.5 rounded-2xl glass-btn font-bold text-base text-[#343B63] flex items-center gap-2.5 cursor-pointer shadow-md group hover:scale-105 active:scale-95 transition-all"
            >
              <span>CONTINUE</span>
              <ArrowRight className="w-4 h-4 text-[#FF4081] group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};
