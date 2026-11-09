import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FallingLettersReveal } from '../reveals/FallingLettersReveal';
import { audio } from '../../utils/audio';
import { fireBirthdayRevealConfetti } from '../../utils/confetti';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Page3BirthdayRevealProps {
  onNext: () => void;
}

export const Page3BirthdayReveal: React.FC<Page3BirthdayRevealProps> = ({ onNext }) => {
  const [firstBalloonPopped, setFirstBalloonPopped] = useState(false);
  const [secondaryBalloonPopped, setSecondaryBalloonPopped] = useState(false);
  const [isBalloonStretching, setIsBalloonStretching] = useState(false);

  const handlePopFirstBalloon = () => {
    if (firstBalloonPopped) return;
    setIsBalloonStretching(true);

    setTimeout(() => {
      audio.playBalloonPop();
      audio.playChime();
      setFirstBalloonPopped(true);
      fireBirthdayRevealConfetti();
    }, 280);
  };

  const handlePopSecondaryBalloon = () => {
    if (secondaryBalloonPopped) return;
    audio.playBalloonPop();
    setSecondaryBalloonPopped(true);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-3xl mx-auto text-center z-10">
      {/* Decorative Stage Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-5 inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/90 border border-[#E8C77B]/70 shadow-sm text-xs font-bold tracking-widest text-[#E8C77B] uppercase select-none"
      >
        <Sparkles className="w-4 h-4 text-[#E8C77B]" />
        <span>Celebration Centerstage · Year 2026</span>
        <Sparkles className="w-4 h-4 text-[#E8C77B]" />
      </motion.div>

      {/* Main Birthday Reveal Stage */}
      <div className="w-full flex flex-col items-center">
        {/* GRAND UN-SPLITTABLE TITLE:
            Intentional two-line break so "KARTHIKA! 🎂" is NEVER split in half!
        */}
        <div className="mb-4">
          <FallingLettersReveal
            text={"HAPPY BIRTHDAY,\nKARTHIKA! 🎂"}
            className="text-3xl sm:text-5xl md:text-6xl font-black font-playfair text-[#343B63] drop-shadow-sm leading-tight tracking-tight"
            letterClassName="text-[#343B63] hover:text-[#FF80AB] transition-colors"
            delayMs={150}
          />
        </div>

        {/* Supporting Greeting Message in Elegant Designer Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="my-3 p-4 sm:p-5 rounded-2xl glass-card border border-[#FFD6E7] max-w-xl mx-auto shadow-sm"
        >
          <p className="text-sm sm:text-base md:text-lg font-medium text-[#343B63] leading-relaxed">
            “May your special day be filled with endless smiles, beautiful memories and magical moments.”
          </p>
        </motion.div>

        {/* Central Balloon Surprise Section with Generous Spacing */}
        <div className="w-full my-6 flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!firstBalloonPopped ? (
              <motion.div
                key="first-balloon"
                animate={
                  isBalloonStretching
                    ? { scale: [1, 1.25, 1.35], rotate: [0, -6, 6, 0] }
                    : { y: [0, -10, 0] }
                }
                transition={{
                  y: { repeat: Infinity, duration: 3, ease: 'easeInOut' },
                  scale: { duration: 0.28 },
                }}
                onClick={handlePopFirstBalloon}
                className="cursor-pointer group flex flex-col items-center select-none"
              >
                {/* 3D Glossy Transparent Celebration Balloon */}
                <div
                  className="relative w-40 sm:w-48 h-52 sm:h-60 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-br from-white/80 via-[#FFD6E7]/65 to-[#BDE7FF]/55 border-2 border-white backdrop-blur-md flex flex-col items-center justify-center p-4 shadow-[0_20px_45px_rgba(255,182,213,0.45)] group-hover:scale-105 active:scale-95 transition-transform"
                >
                  {/* Internal floating gold sparkles and petals */}
                  <div className="absolute inset-0 flex items-center justify-center gap-2.5 text-base">
                    <span className="animate-bounce">✨</span>
                    <span className="animate-pulse">🌸</span>
                    <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>⭐</span>
                  </div>

                  {/* Glossy light reflection */}
                  <div className="absolute top-4 left-5 w-5 h-10 rounded-full bg-white/80 blur-[1px] -rotate-12" />

                  {/* Prominent Glowing Button Badge */}
                  <span className="relative z-10 text-xs font-bold tracking-wider text-[#343B63] bg-white/90 px-4 py-2 rounded-full shadow-md border border-[#E8C77B]/50 flex items-center gap-1.5 group-hover:bg-white">
                    <span>Pop For Surprise</span>
                    <span>🎉</span>
                  </span>

                  {/* Knot & Ribbon */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-2.5 bg-[#E8C77B] rounded-sm" />
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1.5px] h-12 bg-gradient-to-b from-[#E8C77B] to-transparent" />
                </div>

                <p className="mt-3 text-xs font-bold text-[#FF80AB] tracking-widest uppercase animate-pulse">
                  ✨ Tap the Balloon to Reveal Wish ✨
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="revealed-wish"
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, type: 'spring', damping: 20, stiffness: 200 }}
                className="w-full max-w-lg p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E8C77B]/60 shadow-[0_16px_40px_rgba(52,59,99,0.08),0_0_24px_rgba(232,199,123,0.18)] flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="relative inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FFF5F8] to-[#FFFDF0] border border-[#FFD6E7] shadow-2xs mb-2.5 text-[11px] font-bold tracking-widest text-[#FF4081] uppercase">
                  <Sparkles className="w-3 h-3 text-[#E8C77B]" />
                  <span>Celebration Highlight</span>
                  <Sparkles className="w-3 h-3 text-[#E8C77B]" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-playfair text-[#343B63] mb-1.5 leading-tight tracking-tight">
                  Today, Your Happiness Takes The Spotlight
                </h3>
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#E8C77B] to-transparent my-1.5 opacity-70" />
                <p className="text-xs sm:text-sm font-normal text-[#343B63]/85 max-w-md leading-relaxed">
                  May every smile today become a cherished memory that stays with you all year long.
                </p>

                {/* Secondary Mini Balloon Pop for Bonus Wish */}
                {!secondaryBalloonPopped ? (
                  <button
                    onClick={handlePopSecondaryBalloon}
                    className="mt-4 px-4 py-2 rounded-full bg-white/90 hover:bg-white border border-[#FFD6E7] text-xs font-bold text-[#FF80AB] flex items-center gap-2 cursor-pointer shadow-xs hover:scale-105 active:scale-95 transition-transform"
                  >
                    <span>Pop Bonus Balloon 🎈</span>
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 p-3 px-5 rounded-2xl bg-white/80 border border-[#BDE7FF] text-xs font-semibold text-[#343B63] italic"
                  >
                    “Wishing you courage for your dreams and joy in every step! 🌷”
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation CTA */}
        {firstBalloonPopped && (
          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => {
              audio.playPageTransition();
              onNext();
            }}
            className="mt-4 px-8 py-3.5 rounded-2xl glass-btn font-bold text-sm sm:text-base text-[#343B63] flex items-center gap-2.5 cursor-pointer shadow-md group hover:scale-105 active:scale-95 transition-transform"
          >
            <span>Discover Your Portrait Moment</span>
            <ArrowRight className="w-4 h-4 text-[#FF4081] group-hover:translate-x-1 transition-transform" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
