import React from 'react';
import { motion } from 'motion/react';

interface FallingLettersRevealProps {
  text: string;
  className?: string;
  letterClassName?: string;
  delayMs?: number;
  staggerMs?: number;
}

export const FallingLettersReveal: React.FC<FallingLettersRevealProps> = ({
  text,
  className = '',
  letterClassName = '',
  delayMs = 200,
  staggerMs = 40,
}) => {
  // Support explicit lines (separated by \n)
  const lines = text.split('\n');

  let globalCharIndex = 0;

  return (
    <div
      className={`flex flex-col items-center justify-center text-center ${className}`}
      style={{ overflowWrap: 'normal', wordBreak: 'normal', whiteSpace: 'normal' }}
    >
      {lines.map((line, lineIdx) => {
        const words = line.split(' ');

        return (
          <div
            key={`line-${lineIdx}`}
            className="flex flex-wrap items-baseline justify-center gap-x-2.5 sm:gap-x-3.5 my-0.5"
            style={{ overflowWrap: 'normal', wordBreak: 'normal' }}
          >
            {words.map((word, wordIdx) => {
              const chars = Array.from(word);

              return (
                // CRITICAL FIX: Every word is wrapped in whitespace-nowrap so letters CAN NEVER split!
                <span
                  key={`word-${lineIdx}-${wordIdx}`}
                  className="inline-flex items-baseline whitespace-nowrap select-none"
                  style={{ wordBreak: 'keep-all' }}
                >
                  {chars.map((char) => {
                    const charIndex = globalCharIndex++;
                    const randomY = -50 - (charIndex % 4) * 12;
                    const randomRotate = (charIndex % 2 === 0 ? 1 : -1) * (12 + (charIndex % 3) * 6);

                    return (
                      <motion.span
                        key={`char-${charIndex}`}
                        initial={{
                          opacity: 0,
                          y: randomY,
                          rotate: randomRotate,
                          scale: 0.6,
                          filter: 'blur(3px)',
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          rotate: 0,
                          scale: 1,
                          filter: 'blur(0px)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 280,
                          damping: 20,
                          delay: (delayMs + charIndex * staggerMs) / 1000,
                        }}
                        className={`inline-block select-none ${letterClassName}`}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                </span>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
