import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audio } from '../../utils/audio';
import { Sparkles, Mail, Heart, ArrowRight, Eye, RefreshCw } from 'lucide-react';

interface Page5HandwrittenLetterProps {
  onNext: () => void;
}

const LETTER_PARAGRAPHS = [
  "Dear Karthika, 💗",
  "On your birthday, I wanted to create something a little different — a small space filled with warm wishes and thoughts especially for you. 🌸",
  "Some people make ordinary moments brighter without even trying. Their smile, kindness and positive presence make memories worth keeping. ✨",
  "I hope this new year of your life brings you countless reasons to smile, courage to follow your dreams, strength to overcome every challenge and success in everything you work towards. 🌷",
  "Never stop believing in yourself. Keep growing, keep shining and always remember how much potential you have. 🦋",
  "May your days be filled with laughter, your heart with peace and your future with beautiful opportunities. 💕",
  "May every little dream find its way towards becoming something wonderful. ⭐",
  "Happy Birthday, Karthika! 🎂🎉💗",
  "With warm wishes and endless happiness, ✨\nAlways celebrating you 🌸\n\n— Midhun ✨"
];

const FULL_TEXT = LETTER_PARAGRAPHS.join("\n\n");

export const Page5HandwrittenLetter: React.FC<Page5HandwrittenLetterProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSealBroken, setIsSealBroken] = useState(false);
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isWritingComplete, setIsWritingComplete] = useState(false);
  const [readingTimeSeconds, setReadingTimeSeconds] = useState(0);
  const typewriterRef = useRef<number | null>(null);

  // Progressive handwriting animation
  useEffect(() => {
    if (!isOpen) {
      setDisplayedLength(0);
      setIsWritingComplete(false);
      return;
    }

    if (displayedLength >= FULL_TEXT.length) {
      setIsWritingComplete(true);
      return;
    }

    // Pen stroke timer with subtle sound
    const char = FULL_TEXT[displayedLength];
    const isPauseChar = char === '\n' || char === '.' || char === '—';
    const delay = isPauseChar ? 140 : 22;

    typewriterRef.current = window.setTimeout(() => {
      if (displayedLength % 6 === 0) {
        audio.playPenScratch();
      }
      setDisplayedLength((prev) => prev + 1);
    }, delay);

    return () => {
      if (typewriterRef.current) clearTimeout(typewriterRef.current);
    };
  }, [isOpen, displayedLength]);

  // Reading timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setReadingTimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleOpenEnvelope = () => {
    audio.playLetterOpen();
    setIsSealBroken(true);
    setTimeout(() => {
      setIsOpen(true);
    }, 700);
  };

  const handleShowFullLetter = () => {
    if (typewriterRef.current) clearTimeout(typewriterRef.current);
    setDisplayedLength(FULL_TEXT.length);
    setIsWritingComplete(true);
    audio.playChime();
  };

  const handleToggleClose = () => {
    audio.playLetterOpen();
    setIsOpen(!isOpen);
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="relative min-h-[82vh] flex flex-col items-center justify-center px-4 py-8 max-w-2xl mx-auto text-center z-10">
      {/* Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#FFD6E7] text-xs font-bold tracking-widest text-[#FF4081] uppercase shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
        <span>Personal Keepsake · Handwritten Letter</span>
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
      </motion.div>

      {/* Butterfly Banner Announcement */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-5 flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#FFD6E7] via-white to-[#BDE7FF] border border-[#FFB6D5]/60 shadow-sm"
        >
          <span className="text-xl animate-bounce">🦋</span>
          <p className="text-xs sm:text-sm font-semibold text-[#343B63] italic">
            "A little message, written especially for you... 💗"
          </p>
        </motion.div>
      )}

      {/* Envelope View vs Unfolded Letter View */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope-closed"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            className="flex flex-col items-center my-4"
          >
            {/* 3D Realistic Envelope */}
            <div
              onClick={handleOpenEnvelope}
              className="relative w-72 sm:w-84 h-48 sm:h-54 rounded-2xl bg-gradient-to-br from-[#FFF9FB] via-[#FFF0F5] to-[#FFE6EE] border-2 border-white/90 shadow-[0_20px_45px_rgba(255,182,213,0.45)] cursor-pointer group flex items-center justify-center transition-transform hover:scale-105 active:scale-98"
            >
              {/* Envelope Flap triangular styling */}
              <div
                className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-white/90 to-[#FFD6E7]/50 rounded-t-2xl border-b border-[#FFB6D5]/50 flex items-center justify-center transition-transform"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
              />

              {/* Baby-blue Satin Ribbon Band */}
              <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-[#BDE7FF] via-[#D0F0FD] to-[#BDE7FF] border-x border-[#87CEEB]/40 shadow-sm" />
              <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-[#BDE7FF] via-[#D0F0FD] to-[#BDE7FF] border-y border-[#87CEEB]/40 shadow-sm" />

              {/* Blush-pink Wax Seal with Heart */}
              <motion.div
                animate={isSealBroken ? { scale: 0, opacity: 0 } : { scale: [1, 1.08, 1] }}
                transition={{ repeat: isSealBroken ? 0 : Infinity, duration: 2.2 }}
                className="relative z-20 w-14 h-14 rounded-full bg-gradient-to-br from-[#FF4081] to-[#D81B60] border-2 border-white/80 shadow-[0_6px_16px_rgba(216,27,96,0.5)] flex items-center justify-center text-white text-xl"
              >
                <Heart className="w-6 h-6 fill-white text-white drop-shadow-sm" />
              </motion.div>

              <span className="absolute bottom-3 text-[11px] font-bold text-[#FF80AB] tracking-widest uppercase">
                Tap to Break Seal
              </span>
            </div>

            {/* Open Button */}
            <button
              onClick={handleOpenEnvelope}
              className="mt-6 px-8 py-3.5 rounded-2xl glass-btn font-bold text-base text-[#343B63] flex items-center gap-2.5 cursor-pointer shadow-md group"
            >
              <Mail className="w-5 h-5 text-[#FF4081] group-hover:scale-110 transition-transform" />
              <span>OPEN YOUR LETTER 💌</span>
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="letter-unfolded"
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="w-full my-2 flex flex-col items-center"
          >
            {/* Reading Timer & Fast-Forward Bar */}
            <div className="w-full flex items-center justify-between px-2 mb-2 text-xs font-semibold text-[#87CEEB]">
              <span className="flex items-center gap-1.5 bg-white/70 px-3 py-1 rounded-full border border-[#BDE7FF]/50 text-[#343B63]">
                ⏱️ Reading Time: {formatTimer(readingTimeSeconds)}
              </span>
              <div className="flex items-center gap-2">
                {!isWritingComplete && (
                  <button
                    onClick={handleShowFullLetter}
                    className="flex items-center gap-1 bg-[#FFD6E7]/80 hover:bg-[#FFD6E7] text-[#FF4081] px-3 py-1 rounded-full border border-[#FFB6D5] transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>SHOW FULL LETTER</span>
                  </button>
                )}
                <button
                  onClick={handleToggleClose}
                  className="flex items-center gap-1 bg-white/70 hover:bg-white text-[#343B63] px-2.5 py-1 rounded-full border border-[#FFD6E7] cursor-pointer"
                  title="Close envelope"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Fold</span>
                </button>
              </div>
            </div>

            {/* Ultra-Realistic Ivory Parchment Letter */}
            <div
              className={`w-full relative text-left p-6 sm:p-9 rounded-2xl bg-[#FFFDF9] border border-[#E8DCC9] shadow-[0_15px_40px_rgba(52,59,99,0.12),inset_0_0_80px_rgba(255,248,235,0.7)] transition-all duration-700 ${
                isWritingComplete ? 'shadow-[0_0_35px_rgba(232,199,123,0.35)]' : ''
              }`}
              style={{
                backgroundImage:
                  'radial-gradient(#E8C77B 0.6px, transparent 0.6px), radial-gradient(#FFE6EE 0.6px, #FFFDF9 0.6px)',
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px',
              }}
            >
              {/* Paper Watermark Ornament */}
              <div className="absolute top-4 right-4 text-3xl opacity-25 select-none pointer-events-none">
                🌸
              </div>

              {/* Progressively typed letter content */}
              <div className="font-caveat text-xl sm:text-2xl text-[#2F3452] leading-relaxed whitespace-pre-line tracking-wide">
                {FULL_TEXT.slice(0, displayedLength)}
                {!isWritingComplete && (
                  <span className="inline-block w-2.5 h-6 bg-[#FF4081] animate-pulse ml-0.5 align-middle rounded-sm" />
                )}
              </div>

              {/* Final letter decorations when writing is complete:
                  - A little heart appears at the bottom
                  - A flower blooms beside the signature
                  - Golden glow
                  - A butterfly gently lands near signature
              */}
              {isWritingComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="mt-6 pt-4 border-t border-[#FFD6E7]/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-sm text-[#FF80AB] font-caveat font-bold">
                    <span>✨ Always filled with warm light</span>
                    <Heart className="w-4 h-4 fill-[#FF80AB]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-2xl select-none">
                    <span className="animate-spin text-xl" style={{ animationDuration: '8s' }}>
                      🌸
                    </span>
                    <span className="animate-bounce text-2xl">🦋</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Navigation CTA */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={() => {
                audio.playPageTransition();
                onNext();
              }}
              className="mt-6 px-8 py-3.5 rounded-2xl glass-btn font-bold text-base text-[#343B63] flex items-center gap-2 cursor-pointer shadow-md group"
            >
              <span>Explore Appreciation Cards</span>
              <ArrowRight className="w-4 h-4 text-[#FF4081] group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
