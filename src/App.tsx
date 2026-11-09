/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AmbientWorld } from './components/AmbientWorld';
import { TopBar } from './components/TopBar';
import { JourneyProgress } from './components/JourneyProgress';
import { Page1Welcome } from './components/pages/Page1Welcome';
import { Page2PasswordGate } from './components/pages/Page2PasswordGate';
import { Page3BirthdayReveal } from './components/pages/Page3BirthdayReveal';
import { Page4PhotoFrame } from './components/pages/Page4PhotoFrame';
import { Page5HandwrittenLetter } from './components/pages/Page5HandwrittenLetter';
import { Page6AppreciationCards } from './components/pages/Page6AppreciationCards';
import { Page7SkyWishes } from './components/pages/Page7SkyWishes';
import { Page8BirthdayCake } from './components/pages/Page8BirthdayCake';
import { Page9NewChapter } from './components/pages/Page9NewChapter';
import { Page10SecretGift } from './components/pages/Page10SecretGift';
import { Page11GrandFinale } from './components/pages/Page11GrandFinale';
import { Page12MagicalEnding } from './components/pages/Page12MagicalEnding';
import { fireGentleConfetti } from './utils/confetti';
import { audio } from './utils/audio';

export default function App() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sessionKey, setSessionKey] = useState<number>(1); // used to force full state reset on replay
  const totalPages = 12;

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);

      // Trigger gentle celebratory sparkles on routine progression (major events have their own)
      if (![1, 3, 8, 10, 11].includes(nextPage)) {
        fireGentleConfetti();
      }
    }
  };

  const handleSelectPage = (page: number) => {
    audio.playPageTransition();
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplay = () => {
    audio.playPageTransition();
    setSessionKey((prev) => prev + 1);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    audio.playPageTransition();
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div key={sessionKey} className="relative min-h-screen flex flex-col font-outfit overflow-x-hidden pb-18">
      {/* Dynamic 3D Ambient World (Floating latex balloons, bubbles, petals, stars, butterflies) */}
      <AmbientWorld />

      {/* Top Bar Navigation conforming to the 3-Zone Contract */}
      <TopBar currentPage={currentPage} onSelectPage={handleSelectPage} />

      {/* Main Cinematic Page Viewport */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-3 sm:p-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -12 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {currentPage === 1 && <Page1Welcome onNext={handleNextPage} />}
            {currentPage === 2 && <Page2PasswordGate onNext={handleNextPage} />}
            {currentPage === 3 && <Page3BirthdayReveal onNext={handleNextPage} />}
            {currentPage === 4 && <Page4PhotoFrame onNext={handleNextPage} />}
            {currentPage === 5 && <Page5HandwrittenLetter onNext={handleNextPage} />}
            {currentPage === 6 && <Page6AppreciationCards onNext={handleNextPage} />}
            {currentPage === 7 && <Page7SkyWishes onNext={handleNextPage} />}
            {currentPage === 8 && <Page8BirthdayCake onNext={handleNextPage} />}
            {currentPage === 9 && <Page9NewChapter onNext={handleNextPage} />}
            {currentPage === 10 && <Page10SecretGift onNext={handleNextPage} />}
            {currentPage === 11 && <Page11GrandFinale onNext={handleNextPage} />}
            {currentPage === 12 && (
              <Page12MagicalEnding onReplay={handleReplay} onGoHome={handleGoHome} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global 12-Page Journey Progress Strip with Confetti Milestones & Step Navigation */}
      <JourneyProgress
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handleSelectPage}
      />
    </div>
  );
}
