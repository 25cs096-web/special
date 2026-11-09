import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FallingLettersReveal } from '../reveals/FallingLettersReveal';
import { ButterflyCardReveal } from '../reveals/OtherReveals';
import { audio } from '../../utils/audio';
import { fireGrandFinaleConfetti } from '../../utils/confetti';
import { Sparkles, Heart, ArrowRight, PartyPopper } from 'lucide-react';

interface Page11GrandFinaleProps {
  onNext: () => void;
}

export const Page11GrandFinale: React.FC<Page11GrandFinaleProps> = ({ onNext }) => {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    // Play celebratory grand finale fanfare & launch multi-stage confetti
    audio.playGrandFanfare();
    fireGrandFinaleConfetti();

    const t1 = setTimeout(() => setStage(2), 1500);
    const t2 = setTimeout(() => setStage(3), 3200);
    const t3 = setTimeout(() => setStage(4), 4800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-8 max-w-3xl mx-auto text-center z-10">
      {/* Background illumination aura */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#FFD6E7]/40 via-white/30 to-[#FFE082]/30 rounded-3xl blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#FFD6E7] via-white to-[#BDE7FF] border border-[#E8C77B] text-xs font-bold tracking-widest text-[#FF4081] uppercase shadow-md"
      >
        <PartyPopper className="w-4 h-4 text-[#FF4081] animate-bounce" />
        <span>Grand Celestial Finale · 10 November 2026</span>
        <PartyPopper className="w-4 h-4 text-[#FF4081] animate-bounce" style={{ animationDelay: '0.2s' }} />
      </motion.div>

      {/* Main Golden Particle Heading */}
      <div className="my-3">
        <FallingLettersReveal
          text={"HAPPY BIRTHDAY,\nDEAR KARTHIKA! 🎂✨"}
          className="text-2xl sm:text-4xl md:text-5xl font-black font-playfair text-[#343B63] drop-shadow-sm tracking-tight leading-tight"
          letterClassName="text-[#343B63] hover:text-[#FF4081] transition-colors"
          delayMs={200}
        />
      </div>

      {/* Floating Ribbons Message */}
      <AnimatePresence>
        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="my-3 p-4 sm:p-5 rounded-2xl glass-card border border-[#FFD6E7] shadow-md max-w-xl mx-auto"
          >
            <p className="text-sm sm:text-lg font-semibold text-[#343B63] font-playfair leading-relaxed">
              "May your life always be brighter than the stars, your dreams bigger than the sky, and your happiness greater than every wish."
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Butterfly Carries Message */}
      {stage >= 3 && (
        <ButterflyCardReveal
          message="May you keep smiling, growing and achieving everything you dream of."
          delayMs={100}
        />
      )}

      {/* Unfurling Creator Signature Ribbon */}
      <AnimatePresence>
        {stage >= 4 && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, type: 'spring' }}
            className="my-5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD6E7] via-white to-[#FFE082] border-2 border-[#E8C77B] shadow-xl inline-block"
          >
            <span className="text-xs text-[#343B63]/80 uppercase tracking-widest block font-medium">
              With lots of happiness and warm wishes,
            </span>
            <span className="text-lg sm:text-2xl font-black text-[#FF4081] font-playfair tracking-wider">
              FOR DEAR KARTHIKA ✨
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fireworks Re-Trigger Button */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        <button
          onClick={() => {
            audio.playGrandFanfare();
            fireGrandFinaleConfetti();
          }}
          className="px-6 py-2.5 rounded-xl bg-white/90 border border-[#FFB6D5] text-xs sm:text-sm font-bold text-[#FF4081] flex items-center gap-2 cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-transform"
        >
          <Sparkles className="w-4 h-4 text-[#E8C77B]" />
          <span>Launch Fireworks Again 🎆</span>
        </button>

        <button
          onClick={() => {
            audio.playPageTransition();
            onNext();
          }}
          className="px-7 py-3 rounded-2xl glass-btn font-bold text-sm sm:text-base text-[#343B63] flex items-center gap-2 cursor-pointer shadow-md group"
        >
          <span>The Magical Ending</span>
          <ArrowRight className="w-4 h-4 text-[#FF4081] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
