import React from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { audio } from '../utils/audio';

interface JourneyProgressProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PAGE_NAMES = [
  'Welcome',
  'Password Gate',
  'Grand Birthday Reveal',
  'Portrait Frame',
  'Handwritten Letter',
  'Appreciation Cards',
  'Sky Wishes',
  'Birthday Cake',
  'New Chapter',
  'Secret Gift',
  'Grand Finale',
  'Magical Ending',
];

export const JourneyProgress: React.FC<JourneyProgressProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) {
      audio.playPageTransition();
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      audio.playPageTransition();
      onPageChange(currentPage + 1);
    }
  };

  const progressPercent = ((currentPage - 1) / (totalPages - 1)) * 100;

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white/80 backdrop-blur-md border-t border-[#FFD6E7]/80 px-4 py-2.5">
      <div className="max-w-4xl mx-auto flex flex-col gap-1.5">
        {/* Progress Bar Track */}
        <div className="w-full bg-[#FFD6E7]/40 h-1.5 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#FFB6D5] via-[#E8C77B] to-[#87CEEB] transition-all duration-500 rounded-full"
            style={{ width: `${Math.max(8, progressPercent)}%` }}
          />
        </div>

        {/* Control Bar: Prev, Current Chapter Name & Dots, Next */}
        <div className="flex items-center justify-between gap-3 text-xs">
          {/* Previous Page Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage <= 1}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors cursor-pointer select-none ${
              currentPage <= 1
                ? 'opacity-30 cursor-not-allowed text-gray-400'
                : 'bg-white hover:bg-[#FFF0F6] text-[#343B63] border border-[#FFD6E7] shadow-2xs'
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-[#FF4081]" />
            <span className="hidden sm:inline font-semibold">Prev</span>
          </button>

          {/* Current Page Step & Dots */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 px-2 scrollbar-none">
            <span className="font-bold text-[#FF4081] font-mono whitespace-nowrap">
              {currentPage} / {totalPages}
            </span>
            <span className="text-[#343B63]/40">·</span>
            <span className="font-semibold text-[#343B63] whitespace-nowrap truncate max-w-[150px] sm:max-w-[240px]">
              {PAGE_NAMES[currentPage - 1]}
            </span>

            {/* Quick-Jump Milestone Dots */}
            <div className="hidden md:flex items-center gap-1.5 ml-2">
              {Array.from({ length: totalPages }).map((_, i) => {
                const pageNum = i + 1;
                const isActive = pageNum === currentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => {
                      audio.playPageTransition();
                      onPageChange(pageNum);
                    }}
                    title={`Jump to Page ${pageNum}: ${PAGE_NAMES[i]}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      isActive
                        ? 'w-6 bg-[#FF4081]'
                        : 'w-2 bg-[#FFD6E7] hover:bg-[#FFB6D5]'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Next Page Button */}
          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full transition-colors cursor-pointer select-none ${
              currentPage >= totalPages
                ? 'opacity-30 cursor-not-allowed text-gray-400'
                : 'bg-white hover:bg-[#FFF0F6] text-[#343B63] border border-[#FFD6E7] shadow-2xs'
            }`}
          >
            <span className="hidden sm:inline font-semibold">Next</span>
            <ChevronRight className="w-4 h-4 text-[#FF4081]" />
          </button>
        </div>
      </div>
    </div>
  );
};
