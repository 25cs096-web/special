import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BalloonPopReveal } from '../reveals/BalloonPopReveal';
import { FallingLettersReveal } from '../reveals/FallingLettersReveal';
import { ButterflyCardReveal, FlowerBloomReveal } from '../reveals/OtherReveals';
import { audio } from '../../utils/audio';
import { Sparkles, Heart, ArrowRight, Gift } from 'lucide-react';

interface Page7SkyWishesProps {
  onNext: () => void;
}

export const Page7SkyWishes: React.FC<Page7SkyWishesProps> = ({ onNext }) => {
  // Interactive state for wishes
  const [bubblePopped, setBubblePopped] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);
  const [showFinaleBalloons, setShowFinaleBalloons] = useState(false);

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-8 max-w-3xl mx-auto text-center z-10">
      {/* Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#FFD6E7] text-xs font-bold tracking-widest text-[#FF4081] uppercase shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
        <span>Celestial Wishes · 7 Unique Deliveries</span>
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
      </motion.div>

      <h2 className="text-2xl sm:text-3xl font-extrabold font-playfair text-[#343B63] mb-5">
        Wishes Descending from the Heavens 🎈
      </h2>

      {/* Seven Distinct Interactive Wish Deliveries */}
      <div className="w-full space-y-4 max-w-xl mx-auto">
        {/* Wish 1: Pink balloon pops */}
        <BalloonPopReveal
          balloonColor="pink"
          balloonText="Wish 1: Balloon Pop 🎈"
          delayMs={200}
        >
          <div className="p-3.5 px-6 rounded-2xl glass-card border border-[#FFB6D5] shadow-sm">
            <p className="text-sm sm:text-base font-semibold text-[#343B63]">
              "May your life be filled with happiness. 🌸"
            </p>
          </div>
        </BalloonPopReveal>

        {/* Wish 2: Butterfly carries */}
        <ButterflyCardReveal
          message="May your dreams find their wings. 🦋"
          delayMs={400}
        />

        {/* Wish 3: Falling golden letters assemble */}
        <div className="p-3.5 px-6 rounded-2xl glass-card border border-[#E8C77B]/60 shadow-sm flex flex-col items-center">
          <span className="text-[10px] tracking-widest uppercase font-semibold text-[#E8C77B] mb-1">
            Assembled from Golden Particles ⭐
          </span>
          <FallingLettersReveal
            text="May success follow your hard work. ⭐"
            className="text-sm sm:text-base font-semibold text-[#343B63]"
            delayMs={300}
          />
        </div>

        {/* Wish 4: Blooming flower reveals */}
        <FlowerBloomReveal
          message="May peace always live in your heart. 🌸"
          flowerEmoji="🌸"
          delayMs={500}
        />

        {/* Wish 5: Transparent heart bubble pops */}
        <div className="my-2">
          <AnimatePresence mode="wait">
            {!bubblePopped ? (
              <motion.button
                onClick={() => {
                  audio.playBubblePop();
                  setBubblePopped(true);
                }}
                className="mx-auto flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-white/90 via-[#FFD6E7]/70 to-[#BDE7FF]/80 border border-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              >
                <span className="text-xl animate-pulse">🫧</span>
                <span className="text-xs sm:text-sm font-bold text-[#FF4081]">
                  Pop the Heart Bubble 🫧
                </span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-3.5 px-6 rounded-2xl glass-card border border-[#FF80AB] shadow-sm"
              >
                <p className="text-sm sm:text-base font-semibold text-[#343B63]">
                  "May you always have reasons to smile. ✨"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wish 6: Small gift opens */}
        <div className="my-2">
          <AnimatePresence mode="wait">
            {!giftOpened ? (
              <motion.button
                onClick={() => {
                  audio.playGiftOpen();
                  setGiftOpened(true);
                }}
                className="mx-auto flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFF5F8] to-[#FFE6EE] border border-[#FFB6D5] shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform"
              >
                <Gift className="w-4 h-4 text-[#FF4081]" />
                <span className="text-xs sm:text-sm font-bold text-[#343B63]">
                  Open Little Gift Box 🎁
                </span>
              </motion.button>
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-3.5 px-6 rounded-2xl glass-card border border-[#E8C77B] shadow-sm"
              >
                <p className="text-sm sm:text-base font-semibold text-[#343B63]">
                  "May beautiful opportunities find their way to you. 🎁"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wish 7: Shower of stars reveals */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="p-3.5 px-6 rounded-2xl glass-card border border-[#BDE7FF] shadow-sm flex items-center justify-center gap-2"
        >
          <span className="text-lg text-[#E8C77B] animate-twinkle">✨</span>
          <p className="text-sm sm:text-base font-semibold text-[#343B63]">
            "May every new year bring wonderful memories. ✨"
          </p>
          <span className="text-lg text-[#E8C77B] animate-twinkle">✨</span>
        </motion.div>
      </div>

      {/* Finally: Many small balloons rise together and release: THE BEST IS YET TO COME! ✨ */}
      <div className="mt-6 w-full max-w-lg">
        {!showFinaleBalloons ? (
          <button
            onClick={() => {
              audio.playChime();
              setShowFinaleBalloons(true);
            }}
            className="px-6 py-2.5 rounded-full glass-btn text-xs sm:text-sm font-bold text-[#FF4081] cursor-pointer shadow-sm hover:scale-105"
          >
            🎈 Release Sky Balloons 🎈
          </button>
        ) : (
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-[#FFB6D5]/60 shadow-[0_16px_40px_rgba(52,59,99,0.08),0_0_24px_rgba(255,182,213,0.18)] max-w-lg mx-auto flex flex-col items-center relative overflow-hidden text-center"
          >
            <div className="relative inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FFF0F6] to-[#F0F9FF] border border-[#FFD6E7] shadow-2xs mb-2.5 text-[11px] font-bold tracking-widest text-[#FF4081] uppercase">
              <Sparkles className="w-3 h-3 text-[#E8C77B]" />
              <span>Sky Horizon</span>
              <Sparkles className="w-3 h-3 text-[#E8C77B]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-playfair text-[#343B63] tracking-tight">
              The Best Is Yet To Come
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#FFB6D5] to-transparent my-2 opacity-70" />
            <p className="text-xs sm:text-sm text-[#343B63]/85 font-normal max-w-sm leading-relaxed">
              Every horizon holds another reason to smile and celebrate.
            </p>
          </motion.div>
        )}
      </div>

      {/* Navigation CTA */}
      <motion.button
        onClick={() => {
          audio.playPageTransition();
          onNext();
        }}
        className="mt-6 px-8 py-3.5 rounded-2xl glass-btn font-bold text-base text-[#343B63] flex items-center gap-2 cursor-pointer shadow-md group"
      >
        <span>Blow Out The Birthday Candles</span>
        <ArrowRight className="w-4 h-4 text-[#FF4081] group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
};
