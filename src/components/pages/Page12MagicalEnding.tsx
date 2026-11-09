import React from 'react';
import { motion } from 'motion/react';
import { BalloonPopReveal } from '../reveals/BalloonPopReveal';
import { FallingLettersReveal } from '../reveals/FallingLettersReveal';
import { FlowerBloomReveal, ButterflyCardReveal } from '../reveals/OtherReveals';
import { audio } from '../../utils/audio';
import { Sparkles, Moon, RotateCcw, Home } from 'lucide-react';

interface Page12MagicalEndingProps {
  onReplay: () => void;
  onGoHome: () => void;
}

export const Page12MagicalEnding: React.FC<Page12MagicalEndingProps> = ({ onReplay, onGoHome }) => {
  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto text-center z-10">
      {/* Soft Moonlight Glow */}
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-gradient-to-tr from-[#FFF9C4]/35 to-transparent blur-3xl pointer-events-none" />

      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#BDE7FF] text-xs font-bold tracking-widest text-[#343B63] uppercase shadow-sm"
      >
        <Moon className="w-3.5 h-3.5 text-[#E8C77B]" />
        <span>Pastel Twilight · A Lasting Memory</span>
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
      </motion.div>

      {/* Final balloon pops gently to release glowing message */}
      <BalloonPopReveal
        balloonColor="lavender"
        balloonText="Final Balloon 🎈"
        delayMs={300}
        className="my-2"
      >
        <div className="p-4 px-6 rounded-3xl glass-card border border-[#E8DFFF] shadow-md max-w-md mx-auto">
          <h2 className="text-xl sm:text-2xl font-black font-playfair text-[#FF4081]">
            THE MAGIC DOESN'T HAVE TO END ✨
          </h2>
        </div>
      </BalloonPopReveal>

      {/* Falling golden letters: "Thank you for being part of this little birthday world." */}
      <div className="my-3 p-3.5 px-6 rounded-2xl glass-card border border-[#E8C77B]/50 max-w-lg mx-auto shadow-xs">
        <FallingLettersReveal
          text="Thank you for being part of this little birthday world."
          className="text-sm sm:text-base font-semibold text-[#343B63] font-playfair"
          delayMs={600}
        />
      </div>

      {/* Flower blooms: "Keep smiling and make every moment beautiful." */}
      <FlowerBloomReveal
        message="Keep smiling and make every moment beautiful."
        flowerEmoji="🌸"
        delayMs={800}
      />

      {/* Butterfly carries: "Until the next beautiful memory... ✨" */}
      <ButterflyCardReveal
        message="Until the next beautiful memory... ✨"
        delayMs={1100}
      />

      {/* Replay & Home Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <button
          onClick={() => {
            audio.playChime();
            onReplay();
          }}
          className="px-8 py-3.5 rounded-2xl glass-btn font-bold text-base text-[#343B63] flex items-center gap-2.5 cursor-pointer shadow-lg group hover:scale-105 active:scale-95 transition-transform"
        >
          <RotateCcw className="w-4 h-4 text-[#FF4081] group-hover:-rotate-90 transition-transform" />
          <span>REPLAY THE SURPRISE</span>
        </button>

        <button
          onClick={() => {
            audio.playPageTransition();
            onGoHome();
          }}
          className="px-6 py-3.5 rounded-2xl bg-white/90 border border-[#FFD6E7] font-semibold text-sm text-[#343B63] flex items-center gap-2 cursor-pointer shadow-sm hover:bg-white active:scale-95 transition-transform"
        >
          <Home className="w-4 h-4 text-[#343B63]" />
          <span>BACK TO THE FIRST PAGE</span>
        </button>
      </div>
    </div>
  );
};
