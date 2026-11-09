import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { audio } from '../../utils/audio';
import { Sparkles, ArrowRight } from 'lucide-react';

interface Page6AppreciationCardsProps {
  onNext: () => void;
}

interface CardData {
  id: number;
  title: string;
  flowerSymbol: string;
  flowerName: string;
  badge: string;
  quote: string;
  frontBg: string;
  backBg: string;
  borderColor: string;
  accentColor: string;
}

const CARDS: CardData[] = [
  {
    id: 1,
    title: 'SMILE',
    flowerSymbol: '🌸',
    flowerName: 'Pink Rose',
    badge: 'Attribute 01 · Radiance',
    quote: 'Your smile can make an ordinary day feel brighter.',
    frontBg: 'from-[#FFF0F6] via-[#FFE4EE] to-[#FFD6E7]',
    backBg: 'from-white via-[#FFF9FB] to-[#FFF0F6]',
    borderColor: 'border-[#FFB6D5]',
    accentColor: '#FF4081',
  },
  {
    id: 2,
    title: 'KINDNESS',
    flowerSymbol: '🌼',
    flowerName: 'White Jasmine',
    badge: 'Attribute 02 · Gentle Grace',
    quote: 'Your kindness is one of the beautiful things that make you special.',
    frontBg: 'from-[#FAF5FF] via-[#F3E8FF] to-[#E8DFFF]',
    backBg: 'from-white via-[#FCF9FF] to-[#F5EFFF]',
    borderColor: 'border-[#D8B4FE]',
    accentColor: '#9333EA',
  },
  {
    id: 3,
    title: 'HAPPINESS',
    flowerSymbol: '🌷',
    flowerName: 'Pastel Tulip',
    badge: 'Attribute 03 · Joyful Spirit',
    quote: 'May happiness find you even in the smallest moments.',
    frontBg: 'from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA]',
    backBg: 'from-white via-[#FFFAF5] to-[#FFF3E8]',
    borderColor: 'border-[#FDBA74]',
    accentColor: '#EA580C',
  },
  {
    id: 4,
    title: 'STRENGTH',
    flowerSymbol: '🦋',
    flowerName: 'Gentle Blossom',
    badge: 'Attribute 04 · Quiet Courage',
    quote: 'May you always have the courage to overcome every challenge.',
    frontBg: 'from-[#F0F9FF] via-[#E0F2FE] to-[#BDE7FF]',
    backBg: 'from-white via-[#F8FCFF] to-[#EFF6FF]',
    borderColor: 'border-[#87CEEB]',
    accentColor: '#0284C7',
  },
  {
    id: 5,
    title: 'UNIQUENESS',
    flowerSymbol: '✨',
    flowerName: 'Golden Daisy',
    badge: 'Attribute 05 · Authenticity',
    quote: 'Never lose the wonderful qualities that make you who you are.',
    frontBg: 'from-[#FFFDF5] via-[#FEF3C7] to-[#FDE68A]',
    backBg: 'from-white via-[#FFFDF8] to-[#FEF9E7]',
    borderColor: 'border-[#E8C77B]',
    accentColor: '#D97706',
  },
  {
    id: 6,
    title: 'FUTURE',
    flowerSymbol: '⭐',
    flowerName: 'Morning Blossom',
    badge: 'Attribute 06 · Bright Horizons',
    quote: 'Your future is full of beautiful possibilities. Keep believing!',
    frontBg: 'from-[#F8FAFC] via-[#EFF6FF] to-[#DBEAFE]',
    backBg: 'from-white via-[#F8FAFC] to-[#EFF6FF]',
    borderColor: 'border-[#93C5FD]',
    accentColor: '#2563EB',
  },
];

export const Page6AppreciationCards: React.FC<Page6AppreciationCardsProps> = ({ onNext }) => {
  const [openedCardIds, setOpenedCardIds] = useState<Set<number>>(new Set());

  const handleToggleCard = (id: number) => {
    setOpenedCardIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        audio.playCardFlip();
        next.delete(id);
      } else {
        audio.playBalloonPop();
        audio.playChime();
        next.add(id);
      }
      return next;
    });
  };

  const allOpened = openedCardIds.size === CARDS.length;

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 max-w-5xl mx-auto text-center z-10">
      {/* Decorative Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-3 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-white/90 border border-[#E8C77B]/60 text-xs font-bold tracking-widest text-[#E8C77B] uppercase shadow-xs select-none"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
        <span>Six Precious Attributes · Tap Each Card</span>
        <Sparkles className="w-3.5 h-3.5 text-[#E8C77B]" />
      </motion.div>

      <h2 className="text-2xl sm:text-4xl font-black font-playfair text-[#343B63] mb-2 tracking-tight">
        Treasured Reflections for Karthika 🌷
      </h2>
      <p className="text-xs sm:text-sm text-[#343B63]/80 max-w-md mx-auto mb-6 leading-relaxed">
        Tap the floating floral seal on each card to flip and discover the warm thought inside.
      </p>

      {/* Grid of 6 Distinct 3D Flip Cards with Floral Borders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full my-2">
        {CARDS.map((card) => {
          const isOpened = openedCardIds.has(card.id);

          return (
            <div
              key={card.id}
              className="perspective-1000 h-56 sm:h-60 cursor-pointer select-none group"
              onClick={() => handleToggleCard(card.id)}
            >
              <motion.div
                animate={{ rotateY: isOpened ? 180 : 0 }}
                transition={{ duration: 0.65, type: 'spring', stiffness: 220, damping: 20 }}
                className="w-full h-full relative transform-style-preserve-3d"
              >
                {/* FRONT FACE (Closed, Elegant Floral Crest) */}
                <div
                  className={`absolute inset-0 backface-hidden rounded-3xl p-5 flex flex-col items-center justify-between bg-gradient-to-br ${card.frontBg} border-2 ${card.borderColor} shadow-[0_12px_28px_rgba(52,59,99,0.07)] group-hover:scale-[1.02] group-hover:shadow-[0_16px_36px_rgba(52,59,99,0.12)] transition-all`}
                >
                  {/* Top floral corners */}
                  <div className="w-full flex items-center justify-between text-xs text-[#343B63]/60 px-1">
                    <span>🌸</span>
                    <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-[#343B63]/70">
                      Card 0{card.id}
                    </span>
                    <span>✨</span>
                  </div>

                  {/* Central Floating Floral Seal Token */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 2.4 + card.id * 0.2 }}
                      className="w-16 h-16 rounded-full bg-white/90 shadow-md border-2 border-white flex items-center justify-center text-2xl group-hover:scale-110 transition-transform"
                    >
                      <span>{card.flowerSymbol}</span>
                    </motion.div>

                    <h3 className="text-base sm:text-lg font-black font-playfair text-[#343B63] tracking-wider mt-2.5">
                      {card.title}
                    </h3>
                  </div>

                  {/* Bottom Tap Callout */}
                  <span className="text-[11px] font-bold tracking-wider uppercase bg-white/80 px-3.5 py-1 rounded-full text-[#343B63]/80 border border-white shadow-2xs group-hover:bg-white group-hover:text-[#FF4081] transition-colors">
                    Tap To Unfold 🌸
                  </span>
                </div>

                {/* BACK FACE (Flipped in 3D: Revealed Message) */}
                <div
                  className={`absolute inset-0 backface-hidden rotate-y-180 rounded-3xl p-6 flex flex-col items-center justify-between bg-gradient-to-br ${card.backBg} border-2 ${card.borderColor} shadow-[0_16px_36px_rgba(255,182,213,0.35)]`}
                >
                  {/* Top Badge */}
                  <span className="text-[10px] font-bold tracking-widest text-[#87CEEB] uppercase bg-white px-3 py-1 rounded-full border border-[#BDE7FF] shadow-2xs">
                    {card.badge}
                  </span>

                  {/* Quote Message (Natural word wrapping) */}
                  <p
                    className="text-sm sm:text-base font-bold text-[#343B63] font-playfair italic leading-relaxed my-auto text-center"
                    style={{ overflowWrap: 'normal', wordBreak: 'normal' }}
                  >
                    “{card.quote}”
                  </p>

                  {/* Bottom Floral Signoff */}
                  <div className="flex items-center gap-2 text-xs text-[#E8C77B]">
                    <span>🌸</span>
                    <span className="text-[11px] font-semibold text-[#343B63]/70">{card.flowerName}</span>
                    <span>✨</span>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Flower Garden Blooms Celebration Panel after all 6 cards are opened
          (Strictly NO hibiscus flowers or hibiscus emoji!)
      */}
      <AnimatePresence>
        {allOpened && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-8 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E8C77B]/60 shadow-[0_16px_40px_rgba(52,59,99,0.08),0_0_24px_rgba(232,199,123,0.18)] w-full max-w-lg flex flex-col items-center relative overflow-hidden text-center"
          >
            {/* Subtle soft ambient light glow behind card */}
            <div className="absolute -top-12 inset-x-0 h-24 bg-gradient-to-b from-[#FFE8F0]/50 to-transparent blur-xl pointer-events-none" />

            {/* Elegant small pill badge (clean, no emoji clutter) */}
            <div className="relative inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FFF5F8] to-[#FFFDF9] border border-[#FFD6E7] shadow-2xs mb-3 text-[11px] font-bold tracking-widest text-[#FF4081] uppercase">
              <Sparkles className="w-3 h-3 text-[#E8C77B]" />
              <span>Cherished Celebration</span>
              <Sparkles className="w-3 h-3 text-[#E8C77B]" />
            </div>

            {/* Clean, attractive heading */}
            <h3 className="relative text-xl sm:text-2xl font-bold font-playfair text-[#343B63] tracking-tight">
              You Are Truly One Of A Kind
            </h3>

            {/* Elegant divider line */}
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#E8C77B] to-transparent my-2.5 opacity-70" />

            {/* Warm message */}
            <p className="relative text-xs sm:text-sm font-normal text-[#343B63]/85 max-w-sm leading-relaxed">
              Every card reflects a genuine, radiant part of who you are. Keep blossoming beautifully in this wonderful new year.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation CTA */}
      <motion.button
        onClick={() => {
          audio.playPageTransition();
          onNext();
        }}
        className="mt-8 px-8 py-3.5 rounded-2xl glass-btn font-bold text-base text-[#343B63] flex items-center gap-2.5 cursor-pointer shadow-md group hover:scale-105 active:scale-95 transition-transform"
      >
        <span>Watch Wishes Fall From The Sky</span>
        <ArrowRight className="w-4 h-4 text-[#FF4081] group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  );
};
