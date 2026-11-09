import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { audio } from '../../utils/audio';
import { Sparkles, Sun, ArrowRight, Heart } from 'lucide-react';

interface Page9NewChapterProps {
  onNext: () => void;
}

const CHAPTER_MESSAGES = [
  { text: 'New dreams. ✨', emoji: '✨', color: 'from-[#FFF3C4] to-[#FFE082]', border: 'border-[#E8C77B]' },
  { text: 'New achievements. 🌷', emoji: '🌷', color: 'from-[#FFE6EE] to-[#FFD6E7]', border: 'border-[#FF80AB]' },
  { text: 'New opportunities. 🦋', emoji: '🦋', color: 'from-[#E0F2FE] to-[#BDE7FF]', border: 'border-[#87CEEB]' },
  { text: 'New memories. 💗', emoji: '💗', color: 'from-[#FFF0F6] to-[#FFB6D5]', border: 'border-[#FF4081]' },
  { text: 'New reasons to be happy. ⭐', emoji: '⭐', color: 'from-[#F3E8FF] to-[#E8DFFF]', border: 'border-[#D8B4FE]' },
];

export const Page9NewChapter: React.FC<Page9NewChapterProps> = ({ onNext }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < CHAPTER_MESSAGES.length + 1) {
          audio.playChime();
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-8 max-w-3xl mx-auto text-center z-10">
      {/* Sunrise Atmospheric Sunburst */}
      <div className="absolute top-1/4 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-tr from-[#FFE082]/40 via-[#FFB6D5]/30 to-transparent blur-3xl pointer-events-none" />

      {/* Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#E8C77B] text-xs font-bold tracking-widest text-[#E8C77B] uppercase shadow-sm"
      >
        <Sun className="w-4 h-4 text-[#FF9800]" />
        <span>Pastel Sunrise · New Horizons</span>
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
      </motion.div>

      {/* Primary Reveal */}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl sm:text-4xl font-extrabold font-playfair text-[#343B63] mb-6 leading-tight"
      >
        "Every birthday is the beginning of a new chapter."
      </motion.h2>

      {/* Individual Message Reveals with Unique Animation Transitions */}
      <div className="w-full max-w-md space-y-3 my-2">
        {CHAPTER_MESSAGES.map((msg, index) => {
          const isRevealed = activeStep > index;

          return (
            <motion.div
              key={msg.text}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, scale: 0.9 }}
              animate={isRevealed ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0.2, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className={`p-3.5 px-6 rounded-2xl bg-gradient-to-r ${msg.color} border ${msg.border} shadow-sm flex items-center justify-between text-left transition-all`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl select-none">{msg.emoji}</span>
                <span className="text-base sm:text-lg font-bold font-playfair text-[#343B63]">
                  {msg.text}
                </span>
              </div>
              <Sparkles className="w-4 h-4 text-[#E8C77B]" />
            </motion.div>
          );
        })}
      </div>

      {/* Finally: Sunrise becomes brighter and reveals: YOUR NEXT CHAPTER CAN BE BEAUTIFUL. */}
      {activeStep > CHAPTER_MESSAGES.length && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-6 p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E8C77B]/60 shadow-[0_16px_40px_rgba(52,59,99,0.08),0_0_24px_rgba(232,199,123,0.18)] max-w-lg w-full flex flex-col items-center relative overflow-hidden text-center"
        >
          <div className="relative inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FFFDF0] to-[#FFF5F8] border border-[#E8C77B]/50 shadow-2xs mb-2.5 text-[11px] font-bold tracking-widest text-[#B45309] uppercase">
            <Sparkles className="w-3 h-3 text-[#E8C77B]" />
            <span>Golden Horizons</span>
            <Sparkles className="w-3 h-3 text-[#E8C77B]" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-playfair text-[#343B63] tracking-tight">
            Your Next Chapter Can Be Beautiful
          </h3>
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#E8C77B] to-transparent my-2 opacity-70" />
          <p className="text-xs sm:text-sm text-[#343B63]/85 font-normal max-w-sm leading-relaxed">
            Step forward into all the brightness, laughter, and magic waiting ahead.
          </p>
        </motion.div>
      )}

      {/* Navigation CTA */}
      <motion.button
        onClick={() => {
          audio.playPageTransition();
          onNext();
        }}
        className="mt-8 px-8 py-3.5 rounded-2xl glass-btn font-bold text-base text-[#343B63] flex items-center gap-2 cursor-pointer shadow-md group"
      >
        <span>Open The Secret Gift</span>
        <ArrowRight className="w-4 h-4 text-[#FF4081] group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
};
