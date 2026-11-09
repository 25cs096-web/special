import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BalloonPopReveal } from '../reveals/BalloonPopReveal';
import { audio } from '../../utils/audio';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Page4PhotoFrameProps {
  onNext: () => void;
}

export const Page4PhotoFrame: React.FC<Page4PhotoFrameProps> = ({ onNext }) => {
  const [frameLit, setFrameLit] = useState(false);
  const [showPetalsText, setShowPetalsText] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setFrameLit(true);
      audio.playChime();
    }, 800);

    const t2 = setTimeout(() => {
      setShowPetalsText(true);
    }, 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-6 max-w-2xl mx-auto text-center z-10">
      {/* Kicker badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#E8C77B]/60 text-xs font-bold tracking-widest text-[#E8C77B] uppercase shadow-xs select-none"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
        <span>Spotlight Portrait · Birthday Girl</span>
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
      </motion.div>

      {/* Main Photographic Frame Centerpiece */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Soft atmospheric golden rim aura */}
        <div className="absolute inset-0 w-80 h-80 rounded-full bg-gradient-to-tr from-[#FFE082]/35 via-[#FFD6E7]/30 to-transparent blur-2xl pointer-events-none" />

        {/* Orbiting Butterflies & Golden Sparkles outside the portrait */}
        {frameLit && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
            className="absolute w-72 sm:w-92 h-72 sm:h-92 pointer-events-none z-20"
          >
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-2xl drop-shadow-md">
              🦋
            </span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xl drop-shadow-sm">
              🌸
            </span>
            <span className="absolute top-1/2 -left-2 -translate-y-1/2 text-xl text-[#E8C77B] drop-shadow-sm">
              ✨
            </span>
            <span className="absolute top-1/2 -right-2 -translate-y-1/2 text-2xl drop-shadow-md">
              🦋
            </span>
          </motion.div>
        )}

        {/* Realistic Floral Garland Wreath Surrounding Frame (Outside only, never over face) */}
        <div className="relative p-3 sm:p-4 rounded-full bg-gradient-to-tr from-[#FFF5F8] via-[#FFE8A3] to-[#BDE7FF] shadow-[0_20px_50px_rgba(255,182,213,0.45)] animate-float-gentle">
          {/* External decorative flower petals along outer perimeter with gentle organic sway */}
          <div className="absolute -top-3 left-8 text-xl select-none animate-breeze">🌸</div>
          <div className="absolute -top-2 right-10 text-lg select-none animate-breeze" style={{ animationDelay: '1s' }}>🌼</div>
          <div className="absolute top-1/3 -left-3 text-lg select-none animate-breeze" style={{ animationDelay: '2s' }}>🌸</div>
          <div className="absolute top-1/3 -right-3 text-xl select-none animate-breeze" style={{ animationDelay: '1.5s' }}>🌷</div>
          <div className="absolute -bottom-2 left-12 text-lg select-none animate-breeze" style={{ animationDelay: '0.5s' }}>🌼</div>
          <div className="absolute -bottom-3 right-10 text-xl select-none animate-breeze" style={{ animationDelay: '2.5s' }}>🌸</div>

          {/* Gold Filigree Ring */}
          <div className="p-2 sm:p-2.5 rounded-full bg-gradient-to-r from-[#E8C77B] via-white to-[#E8C77B] shadow-inner">
            {/* White Inner Border Container */}
            <div className="w-60 h-60 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white relative">
              {/* ORIGINAL UNALTERED PHOTOGRAPH OF KARTHIKA PRESERVED 100% */}
              <img
                src="/assets/aistudio/IMG_20251128_194245_433499e5.JPG"
                alt="Portrait of Karthika"
                className="w-full h-full object-cover object-[center_20%] select-none transition-transform duration-700 hover:scale-105"
                style={{
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                }}
                loading="eager"
              />
              {/* Realistic glass reflection sweep passing across frame */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                <div className="w-[200%] h-[200%] -top-1/2 -left-1/2 bg-gradient-to-tr from-transparent via-white/25 to-transparent animate-glass-sheen" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text appearing through falling petals: "A beautiful smile deserves a beautiful moment." */}
      <AnimatePresence>
        {showPetalsText && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="my-3 p-5 px-7 rounded-3xl bg-white/90 backdrop-blur-md border border-[#FFD6E7] shadow-[0_12px_32px_rgba(52,59,99,0.06)] max-w-lg mx-auto flex flex-col items-center text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#FFF5F8] to-[#FFFDF9] border border-[#FFD6E7] shadow-2xs mb-2 text-[10px] font-bold tracking-widest text-[#FF4081] uppercase">
              <Sparkles className="w-3 h-3 text-[#E8C77B]" />
              <span>Portrait Keepsake</span>
              <Sparkles className="w-3 h-3 text-[#E8C77B]" />
            </div>
            <p className="text-base sm:text-lg md:text-xl font-bold text-[#343B63] font-playfair italic leading-relaxed">
              “A beautiful smile deserves a beautiful moment.”
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Golden Balloon Pops to reveal: "Keep shining, Karthika! ✨" */}
      <div className="w-full my-2">
        <BalloonPopReveal
          balloonColor="gold"
          balloonText="Golden Balloon 🎈"
          delayMs={1400}
          autoPop={false}
        >
          <div className="p-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FFFDF5] via-white to-[#F0F9FF] border border-[#E8C77B]/70 max-w-sm mx-auto shadow-md">
            <h3 className="text-base sm:text-xl font-black font-playfair text-[#FF4081] flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E8C77B]" />
              <span className="whitespace-nowrap">Keep shining, Karthika! ✨</span>
              <Sparkles className="w-4 h-4 text-[#E8C77B]" />
            </h3>
          </div>
        </BalloonPopReveal>
      </div>

      {/* Navigation CTA */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        onClick={() => {
          audio.playPageTransition();
          onNext();
        }}
        className="mt-4 px-8 py-3.5 rounded-2xl glass-btn font-bold text-sm sm:text-base text-[#343B63] flex items-center gap-2.5 cursor-pointer shadow-md group hover:scale-105 active:scale-95 transition-transform"
      >
        <span>Open Your Special Letter</span>
        <ArrowRight className="w-4 h-4 text-[#FF4081] group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
};
