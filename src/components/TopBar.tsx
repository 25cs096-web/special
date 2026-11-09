import React from 'react';
import { AudioBar } from './AudioBar';

interface TopBarProps {
  currentPage: number;
  onSelectPage: (page: number) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentPage, onSelectPage }) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/75 backdrop-blur-md border-b border-[#FFD6E7]/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectPage(1)}
          className="text-base sm:text-lg font-bold tracking-tight text-[#343B63] font-playfair whitespace-nowrap shrink-0 cursor-pointer hover:text-[#FF4081] transition-colors"
        >
          Karthika's Birthday World
        </button>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#343B63]/80">
          <button
            onClick={() => onSelectPage(1)}
            className={`hover:text-[#FF4081] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 1 ? 'text-[#FF4081] font-bold' : ''
            }`}
          >
            Welcome
          </button>
          <button
            onClick={() => onSelectPage(4)}
            className={`hover:text-[#FF4081] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 4 ? 'text-[#FF4081] font-bold' : ''
            }`}
          >
            Portrait
          </button>
          <button
            onClick={() => onSelectPage(5)}
            className={`hover:text-[#FF4081] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 5 ? 'text-[#FF4081] font-bold' : ''
            }`}
          >
            Letter
          </button>
          <button
            onClick={() => onSelectPage(6)}
            className={`hover:text-[#FF4081] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 6 ? 'text-[#FF4081] font-bold' : ''
            }`}
          >
            Cards
          </button>
          <button
            onClick={() => onSelectPage(11)}
            className={`hover:text-[#FF4081] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              currentPage === 11 ? 'text-[#FF4081] font-bold' : ''
            }`}
          >
            Finale
          </button>
        </nav>

        {/* Zone 3: 1 primary action (Audio & melody control) */}
        <div className="flex items-center gap-2 shrink-0">
          <AudioBar />
        </div>
      </div>
    </header>
  );
};
