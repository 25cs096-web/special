import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FallingLettersReveal } from '../reveals/FallingLettersReveal';
import {
  CuteTeddyBear,
  CuteBunny,
  CuteBabyCloud,
  CuteStarCharacter,
  CuteBirdBranch,
} from '../characters/CuteAnimatedCharacters';
import { audio } from '../../utils/audio';
import { fireWelcomeConfetti } from '../../utils/confetti';
import { Sparkles, FastForward, RotateCcw, ArrowRight } from 'lucide-react';

interface Page1WelcomeProps {
  onNext: () => void;
}

export const Page1Welcome: React.FC<Page1WelcomeProps> = ({ onNext }) => {
  // Scene index:
  // 1: Midnight sky & golden glow expansion
  // 2: Magical glowing multi-ring portal
  // 3: Satin curtains parting
  // 4: Cute animated characters appearing
  // 5: Balloon celebration & pop message
  // 6: Golden title reveal ("A LITTLE WORLD OF HAPPINESS")
  // 7: Full grand welcome ("WELCOME TO YOUR BIRTHDAY WONDERLAND, KARTHIKA! 🎂")
  const [scene, setScene] = useState<number>(1);
  const [balloonPopped, setBalloonPopped] = useState(false);
  const [isEnteringPortal, setIsEnteringPortal] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const clearAllTimers = () => {
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];
  };

  const startCinematicTimeline = () => {
    clearAllTimers();
    setScene(1);
    setBalloonPopped(false);
    setIsEnteringPortal(false);

    // Audio cue
    audio.resume();
    audio.startMusic();

    // Scene progression timeline (12-16 seconds total)
    timeoutsRef.current.push(
      window.setTimeout(() => {
        setScene(2);
        audio.playPortalOpen();
      }, 2600),
      window.setTimeout(() => {
        setScene(3);
        audio.playCurtainOpen();
      }, 5200),
      window.setTimeout(() => {
        setScene(4);
        audio.playCharacterBounce();
      }, 7600),
      window.setTimeout(() => {
        setScene(5);
      }, 10200),
      window.setTimeout(() => {
        setScene(6);
      }, 12800),
      window.setTimeout(() => {
        setScene(7);
        audio.playChime();
      }, 15200)
    );
  };

  useEffect(() => {
    startCinematicTimeline();
    return () => clearAllTimers();
  }, []);

  const handleSkipIntro = () => {
    clearAllTimers();
    setScene(7);
    setBalloonPopped(true);
    audio.playChime();
  };

  const handleReplayIntro = () => {
    startCinematicTimeline();
  };

  const handlePopBalloon = () => {
    if (balloonPopped) return;
    audio.playBalloonPop();
    setBalloonPopped(true);
  };

  const handleBegin = () => {
    audio.playChime();
    fireWelcomeConfetti();
    setIsEnteringPortal(true);

    setTimeout(() => {
      onNext();
    }, 700);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-6 max-w-4xl mx-auto text-center z-10 overflow-hidden">
      {/* Top Controls: Skip Intro & Replay Intro */}
      <div className="absolute top-2 right-2 sm:right-6 z-50 flex items-center gap-2">
        {scene < 7 && (
          <button
            onClick={handleSkipIntro}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 hover:bg-white text-xs font-semibold text-[#343B63] border border-[#FFD6E7] shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <FastForward className="w-3.5 h-3.5 text-[#FF4081]" />
            <span>Skip Intro</span>
          </button>
        )}
        {scene >= 7 && (
          <button
            onClick={handleReplayIntro}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 hover:bg-white text-xs font-semibold text-[#343B63] border border-[#FFD6E7] shadow-xs cursor-pointer hover:scale-105 active:scale-95 transition-transform"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E8C77B]" />
            <span>Replay Intro</span>
          </button>
        )}
      </div>

      {/* SCENE 1: Midnight-blue and purple sky with expanding golden light */}
      <AnimatePresence>
        {scene === 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-40 bg-gradient-to-b from-[#0F142E] via-[#221B4A] to-[#3B2664] flex flex-col items-center justify-center text-white pointer-events-none"
          >
            {/* Stars illuminating one by one */}
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={`deep-star-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0.7], scale: [0, 1.3, 1] }}
                transition={{ delay: 0.15 + (i * 0.08), duration: 1 }}
                className="absolute text-[#FFE082]"
                style={{
                  top: `${(i * 19 + 5) % 90}%`,
                  left: `${(i * 27 + 10) % 92}%`,
                  fontSize: `${8 + (i % 3) * 6}px`,
                }}
              >
                ✦
              </motion.div>
            ))}

            {/* Expanding central golden light aura */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{ scale: [0.2, 1.8, 3.5], opacity: [0, 0.8, 0.4] }}
              transition={{ duration: 2.6, ease: 'easeOut' }}
              className="w-48 h-48 rounded-full bg-gradient-to-r from-[#FFE082] via-[#FFD6E7] to-transparent blur-3xl"
            />

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#FFE082] z-10"
            >
              ✨ A Celestial Birthday Journey Begins ✨
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCENE 2 & 3: Magical Rotating Circular Light Portal */}
      <AnimatePresence>
        {(scene >= 2 && scene <= 4) && (
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1.4 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            {/* Outer Golden Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
              className="w-72 sm:w-96 h-72 sm:h-96 rounded-full border-2 border-dashed border-[#E8C77B]/70 shadow-[0_0_50px_rgba(232,199,123,0.5)]"
            />
            {/* Middle Lavender & Pink Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
              className="absolute w-56 sm:w-76 h-56 sm:h-76 rounded-full border-2 border-dotted border-[#FFB6D5]/80 shadow-[0_0_35px_rgba(255,182,213,0.5)]"
            />
            {/* Inner Baby-Blue Glow Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
              className="absolute w-44 sm:w-56 h-44 sm:h-56 rounded-full border border-[#87CEEB]/70 shadow-[0_0_25px_rgba(135,206,235,0.6)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* SCENE 3: Realistic Satin Curtains Parting */}
      <AnimatePresence>
        {scene === 3 && (
          <div className="fixed inset-0 z-40 pointer-events-none flex">
            {/* Left Satin Curtain with cloth folds */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/2 h-full bg-gradient-to-r from-[#FFB6D5] via-[#FFD6E7] to-[#FFE6EE] shadow-[15px_0_35px_rgba(0,0,0,0.15)] flex flex-col justify-around px-8 animate-cloth-wave"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0px, transparent 30px, rgba(0,0,0,0.06) 60px)',
              }}
            >
              <div className="w-1 h-full bg-white/40 absolute right-0" />
            </motion.div>

            {/* Right Satin Curtain */}
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-1/2 h-full bg-gradient-to-l from-[#BDE7FF] via-[#D0F0FD] to-[#E0F2FE] shadow-[-15px_0_35px_rgba(0,0,0,0.15)] flex flex-col justify-around px-8 animate-cloth-wave"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, rgba(255,255,255,0.4) 0px, transparent 30px, rgba(0,0,0,0.06) 60px)',
              }}
            >
              <div className="w-1 h-full bg-white/40 absolute left-0" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Camera zoom effect when clicking enter button */}
      <motion.div
        animate={isEnteringPortal ? { scale: 1.6, opacity: 0, filter: 'blur(8px)' } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.65, ease: 'easeInOut' }}
        className="w-full flex flex-col items-center"
      >
        {/* SCENE 4: Cute 3D Animated Characters Strip */}
        <AnimatePresence>
          {scene >= 4 && (
            <motion.div
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, type: 'spring' }}
              className="w-full flex items-end justify-center gap-3 sm:gap-6 my-2 px-2"
            >
              {/* Smiling Baby Cloud */}
              <div className="hidden sm:block">
                <CuteBabyCloud />
              </div>

              {/* Waving Star Character */}
              <div>
                <CuteStarCharacter />
              </div>

              {/* Teddy Bear Holding Gift */}
              <div>
                <CuteTeddyBear />
              </div>

              {/* Cute White Bunny Carrying Flower */}
              <div>
                <CuteBunny />
              </div>

              {/* Cute Bird on Flower Branch */}
              <div className="hidden sm:block">
                <CuteBirdBranch />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCENE 5: Realistic Balloon Celebration with Pop Message */}
        <AnimatePresence>
          {scene >= 5 && scene < 7 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="my-3 flex flex-col items-center"
            >
              {!balloonPopped ? (
                <div
                  onClick={handlePopBalloon}
                  className="cursor-pointer group flex flex-col items-center select-none"
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                    className="relative w-24 h-32 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-br from-white/80 via-[#FFD6E7]/70 to-[#BDE7FF]/60 border-2 border-white backdrop-blur-xs flex items-center justify-center shadow-[0_12px_28px_rgba(255,182,213,0.5)] group-hover:scale-105 active:scale-95 transition-transform"
                  >
                    <span className="text-sm font-bold text-[#343B63] bg-white/80 px-2 py-0.5 rounded-full shadow-2xs">
                      Pop Me 🎈
                    </span>
                    <div className="absolute -bottom-1.5 w-2 h-1.5 bg-[#FF80AB] rounded-sm" />
                    <div className="absolute top-full w-[1px] h-8 bg-[#FF80AB]/60" />
                  </motion.div>
                  <span className="text-[10px] text-[#FF80AB] font-bold tracking-wider uppercase mt-2">
                    ✨ Tap to Open ✨
                  </span>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-3.5 px-6 rounded-2xl glass-card border border-[#E8C77B] shadow-md max-w-md mx-auto"
                >
                  <p className="text-sm sm:text-base font-semibold text-[#343B63] italic">
                    “A little world of happiness is waiting for you...”
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCENE 6 & 7: Main Birthday Title Reveal:
            A LITTLE WORLD OF HAPPINESS ✨
            Someone special deserves a beautiful surprise...
            WELCOME TO YOUR BIRTHDAY WONDERLAND, KARTHIKA! 🎂
        */}
        <AnimatePresence>
          {scene >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full my-2 flex flex-col items-center"
            >
              {/* Assembled Golden Letters */}
              <FallingLettersReveal
                text="A LITTLE WORLD OF HAPPINESS ✨"
                className="text-2xl sm:text-4xl md:text-5xl font-black font-playfair text-[#343B63] drop-shadow-sm tracking-tight"
                letterClassName="text-[#343B63] hover:text-[#FF80AB] transition-colors"
                delayMs={150}
              />

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-2 text-sm sm:text-base font-medium text-[#343B63]/80 italic"
              >
                Someone special deserves a beautiful surprise...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCENE 7: Grand Welcome Display:
            WELCOME TO YOUR BIRTHDAY WONDERLAND, KARTHIKA! 🎂
            (NO CREATOR NAME ANYWHERE)
        */}
        <AnimatePresence>
          {scene >= 7 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="my-3 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#FFD6E7] via-white to-[#BDE7FF] border-2 border-[#E8C77B] shadow-xl max-w-xl w-full flex flex-col items-center"
            >
              <div className="flex items-center gap-2 text-sm text-[#E8C77B] mb-1 font-bold">
                <span>✨</span>
                <span>10 November 2026</span>
                <span>✨</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-black font-playfair text-[#FF4081] tracking-tight leading-snug">
                <span className="block">WELCOME TO YOUR BIRTHDAY WONDERLAND,</span>
                <span className="inline-block mt-1 text-[#343B63] whitespace-nowrap">KARTHIKA! 🎂</span>
              </h2>
              <p className="text-xs sm:text-sm font-medium text-[#343B63] mt-1.5 max-w-md">
                Step inside your enchanted celebration filled with surprises, wishes, and memories.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SCENE 8: 3D Glass Button: LET'S BEGIN ✨ */}
        <AnimatePresence>
          {scene >= 7 && (
            <motion.button
              onClick={handleBegin}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-4 px-8 py-3.5 rounded-2xl glass-btn font-bold text-base sm:text-lg text-[#343B63] flex items-center gap-3 cursor-pointer group shadow-[0_12px_32px_rgba(255,182,213,0.5)] border border-white hover:border-[#FFB6D5] transition-all"
            >
              <Sparkles className="w-5 h-5 text-[#E8C77B] group-hover:rotate-45 transition-transform" />
              <span>LET'S BEGIN ✨</span>
              <ArrowRight className="w-4 h-4 text-[#FF4081] group-hover:translate-x-1 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
