import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BalloonPopReveal } from '../reveals/BalloonPopReveal';
import { audio } from '../../utils/audio';
import { fireCandleConfetti } from '../../utils/confetti';
import { Sparkles, Flame, Wind, ArrowRight, RotateCcw } from 'lucide-react';

interface Page8BirthdayCakeProps {
  onNext: () => void;
}

export const Page8BirthdayCake: React.FC<Page8BirthdayCakeProps> = ({ onNext }) => {
  const [entranceStep, setEntranceStep] = useState(0);
  const [isBlowing, setIsBlowing] = useState(false);
  const [isBlown, setIsBlown] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  // Entrance sequence:
  // 1. Soft golden glow at bottom
  // 2. Balloon curtain moves aside
  // 3. Cake rises gently
  // 4. Flowers bloom & candles illuminate one by one
  // 5. Golden particles float & camera moves closer
  useEffect(() => {
    const t1 = setTimeout(() => setEntranceStep(1), 300); // curtain opens
    const t2 = setTimeout(() => setEntranceStep(2), 900); // cake rises
    const t3 = setTimeout(() => setEntranceStep(3), 1600); // flowers & candles illuminate
    const t4 = setTimeout(() => {
      setEntranceStep(4);
      audio.playChime();
    }, 2400); // camera closer & full reveal

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleBlowCandles = () => {
    if (isBlown || isBlowing) return;
    setIsBlowing(true);
    audio.playCandleBlow();

    // Natural bending of flame before extinguish
    setTimeout(() => {
      setIsBlowing(false);
      setIsBlown(true);
      setShowSmoke(true);
      fireCandleConfetti();
    }, 400);

    setTimeout(() => {
      setShowSmoke(false);
    }, 3800);
  };

  const handleRelightCandles = () => {
    audio.playChime();
    setIsBlown(false);
    setIsBlowing(false);
    setShowSmoke(false);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-4xl mx-auto text-center z-10">
      {/* 1. Soft golden glow at bottom of the screen */}
      <div className="absolute bottom-0 inset-x-0 h-72 bg-gradient-to-t from-[#FFE082]/35 via-[#FFD6E7]/20 to-transparent blur-3xl pointer-events-none" />

      {/* Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#E8C77B] text-xs font-bold tracking-widest text-[#E8C77B] uppercase shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
        <span>Luxury Three-Tier Centerpiece · Professional Culinary Studio</span>
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
      </motion.div>

      {/* Main Heading Reveal */}
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl sm:text-4xl font-extrabold font-playfair text-[#343B63] mb-1"
      >
        MAKE A WISH, KARTHIKA! 🎂
      </motion.h2>

      {/* Below it, reveal: "Every beautiful wish deserves a little magic." */}
      <BalloonPopReveal
        balloonColor="gold"
        balloonText="Pop Wish Balloon 🎈"
        delayMs={600}
        className="mb-2"
      >
        <div className="p-2.5 px-6 rounded-2xl glass-card border border-[#E8C77B]/60 max-w-md mx-auto shadow-xs">
          <p className="text-xs sm:text-sm font-medium text-[#343B63] italic">
            “Every beautiful wish deserves a little magic.”
          </p>
        </div>
      </BalloonPopReveal>

      {/* 2. Balloon curtain that moves aside on entrance */}
      <AnimatePresence>
        {entranceStep < 1 && (
          <div className="fixed inset-0 z-30 pointer-events-none flex">
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '-110%' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/2 h-full bg-gradient-to-r from-[#FFD6E7] to-[#BDE7FF] opacity-80 backdrop-blur-md"
            />
            <motion.div
              initial={{ x: 0 }}
              exit={{ x: '110%' }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/2 h-full bg-gradient-to-l from-[#FFD6E7] to-[#BDE7FF] opacity-80 backdrop-blur-md"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Realistic 3-Tier Luxury Cake Stage */}
      <div className="relative my-4 flex flex-col items-center">
        {/* Floating sugar flowers & stars blooming around cake stand */}
        {entranceStep >= 3 && (
          <>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-6 -left-6 sm:-left-12 text-2xl animate-twinkle pointer-events-none"
            >
              ✨
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute -top-4 -right-6 sm:-right-12 text-2xl pointer-events-none"
            >
              🌸
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-2 -left-8 text-2xl pointer-events-none"
            >
              🌷
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-2 -right-8 text-2xl pointer-events-none"
            >
              🌼
            </motion.div>
          </>
        )}

        {/* Realistic Cake Presentation Container */}
        <motion.div
          initial={{ y: 60, scale: 0.94, opacity: 0 }}
          animate={{
            y: entranceStep >= 2 ? 0 : 60,
            scale: entranceStep >= 4 ? 1.02 : 1,
            opacity: entranceStep >= 2 ? 1 : 0,
          }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-md sm:max-w-xl rounded-3xl p-3 sm:p-4 glass-card border-2 border-white/90 shadow-[0_25px_60px_rgba(52,59,99,0.15)] flex flex-col items-center select-none overflow-visible"
        >
          {/* Candle Flames Overlay positioned precisely atop the top tier */}
          <div className="absolute top-[8%] sm:top-[7%] inset-x-0 flex items-end justify-center gap-7 sm:gap-9 z-30 pointer-events-none">
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="relative flex flex-col items-center">
                {/* Smoke trails when extinguished */}
                <AnimatePresence>
                  {showSmoke && isBlown && (
                    <motion.div
                      initial={{ opacity: 0, y: 0, scale: 0.5 }}
                      animate={{
                        opacity: [0, 0.7, 0],
                        y: -40 - idx * 8,
                        x: (idx - 1) * 12,
                        scale: 1.4,
                      }}
                      transition={{ duration: 2.4, ease: 'easeOut' }}
                      className="absolute -top-10 text-gray-400 select-none pointer-events-none"
                    >
                      <Wind className="w-5 h-5 animate-pulse" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dynamic Flickering & Bending Candle Flame */}
                <AnimatePresence>
                  {!isBlown && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={
                        isBlowing
                          ? { scaleX: 0.4, scaleY: 1.2, x: 10, rotate: 35, opacity: 0.8 }
                          : {
                              scale: [1, 1.12, 0.96, 1],
                              y: [0, -1.5, 0.5, 0],
                              rotate: [0, 2, -2, 0],
                              opacity: 1,
                            }
                      }
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{
                        repeat: isBlowing ? 0 : Infinity,
                        duration: 0.85 + idx * 0.15,
                        delay: entranceStep >= 3 ? idx * 0.25 : 0,
                      }}
                      className="relative w-4 sm:w-5 h-7 sm:h-8 flex items-center justify-center -mb-0.5"
                    >
                      {/* Outer golden halo glow */}
                      <div className="absolute inset-0 rounded-[50%_50%_20%_20%] bg-gradient-to-t from-[#FF5722] via-[#FFC107] to-[#FFF9C4] animate-flicker shadow-[0_0_18px_rgba(255,193,7,0.95),0_-4px_12px_rgba(255,152,0,0.8)]" />
                      {/* Inner luminous blue flame root */}
                      <div className="absolute bottom-0 w-1.5 h-2 rounded-full bg-cyan-300 opacity-80" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Candle wick */}
                <div className="w-[1.5px] h-2 bg-stone-800" />
                {/* Champagne-gold candle stick */}
                <div className="w-2.5 sm:w-3 h-8 sm:h-9 rounded-t-xs bg-gradient-to-r from-[#E8C77B] via-[#FFF3C4] to-[#C9A24D] border-x border-[#C9A24D]/60 shadow-xs" />
              </div>
            ))}
          </div>

          {/* Real studio food photography of the 3-tier luxury cake */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-inner">
            <img
              src="/src/assets/images/luxury_three_tier_birthday_cake_1794244630885.jpg"
              alt="Magnificent luxury three-tier birthday cake with ivory buttercream and blush-pink accents"
              referrerPolicy="no-referrer"
              className="w-full h-auto object-cover rounded-2xl transform transition-transform duration-700 hover:scale-[1.01]"
              loading="eager"
            />

            {/* Subtle soft rim lighting glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-white/20 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Post-Blow Reveal Message */}
      <AnimatePresence>
        {isBlown && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="my-3 p-6 sm:p-7 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E8C77B]/60 shadow-[0_16px_40px_rgba(52,59,99,0.08),0_0_24px_rgba(232,199,123,0.18)] max-w-lg w-full flex flex-col items-center relative overflow-hidden text-center"
          >
            {/* Subtle soft ambient light glow behind card */}
            <div className="absolute -top-10 inset-x-0 h-20 bg-gradient-to-b from-[#FFF3D6]/50 to-transparent blur-xl pointer-events-none" />

            {/* Elegant small pill badge (clean, no emoji clutter) */}
            <div className="relative inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FFFDF5] to-[#FFF5F8] border border-[#E8C77B]/50 shadow-2xs mb-3 text-[11px] font-bold tracking-widest text-[#B45309] uppercase">
              <Sparkles className="w-3 h-3 text-[#E8C77B]" />
              <span>Special Birthday Wish</span>
              <Sparkles className="w-3 h-3 text-[#E8C77B]" />
            </div>

            <h3 className="relative text-xl sm:text-2xl font-bold font-playfair text-[#343B63] tracking-tight">
              May All Your Beautiful Wishes Come True
            </h3>

            {/* Elegant divider line */}
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#E8C77B] to-transparent my-2.5 opacity-70" />

            <p className="relative text-xs sm:text-sm font-normal text-[#343B63]/85 max-w-sm leading-relaxed">
              The sweet magic of your birthday has officially begun. Keep shining bright.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Buttons: Blow Candles / Light Again */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
        {!isBlown ? (
          <button
            onClick={handleBlowCandles}
            className="px-8 py-3.5 rounded-2xl glass-btn font-bold text-base text-[#343B63] flex items-center gap-2.5 cursor-pointer shadow-lg group hover:scale-105 active:scale-95 transition-transform"
          >
            <Flame className="w-5 h-5 text-[#FF9800] fill-[#FF9800] group-hover:scale-110 transition-transform" />
            <span>BLOW THE CANDLES 🕯️</span>
          </button>
        ) : (
          <button
            onClick={handleRelightCandles}
            className="px-6 py-2.5 rounded-xl bg-white/90 border border-[#E8C77B] font-semibold text-xs sm:text-sm text-[#343B63] flex items-center gap-2 cursor-pointer shadow-sm hover:bg-white active:scale-95 transition-transform"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E8C77B]" />
            <span>LIGHT THE CANDLES AGAIN</span>
          </button>
        )}

        <button
          onClick={() => {
            audio.playPageTransition();
            onNext();
          }}
          className="px-7 py-3.5 rounded-2xl glass-btn font-bold text-sm sm:text-base text-[#343B63] flex items-center gap-2 cursor-pointer shadow-md group"
        >
          <span>Gaze Into A New Chapter</span>
          <ArrowRight className="w-4 h-4 text-[#FF4081] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
