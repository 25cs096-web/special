import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

/**
 * High-polish animated 3D-styled characters:
 * - Teddy bear holding a birthday gift (waves paw, blinks)
 * - White bunny carrying a flower (hops gently, ear twitch)
 * - Smiling baby cloud (floats, bobs)
 * - Tiny star character (waving happily)
 * - Little bird on flower branch (wing flutter, head tilt)
 */

export const CuteTeddyBear: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -4, 0] }}
      transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      <svg width="78" height="92" viewBox="0 0 100 120" className="drop-shadow-md">
        <defs>
          <radialGradient id="teddyFur" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#E2A77A" />
            <stop offset="65%" stopColor="#C68352" />
            <stop offset="100%" stopColor="#9C5A2C" />
          </radialGradient>
          <radialGradient id="teddyMuzzle" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#FFF2E5" />
            <stop offset="100%" stopColor="#ECD3BD" />
          </radialGradient>
          <linearGradient id="giftBox" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFB6D5" />
            <stop offset="100%" stopColor="#FF80AB" />
          </linearGradient>
        </defs>

        {/* Ears */}
        <circle cx="28" cy="24" r="14" fill="url(#teddyFur)" />
        <circle cx="28" cy="24" r="7" fill="#E8A882" opacity="0.8" />
        <circle cx="72" cy="24" r="14" fill="url(#teddyFur)" />
        <circle cx="72" cy="24" r="7" fill="#E8A882" opacity="0.8" />

        {/* Head */}
        <ellipse cx="50" cy="42" rx="28" ry="24" fill="url(#teddyFur)" />

        {/* Eyes (with natural blink) */}
        {blink ? (
          <>
            <path d="M 36 38 Q 40 42 44 38" stroke="#3D2012" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M 56 38 Q 60 42 64 38" stroke="#3D2012" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="40" cy="38" r="3.5" fill="#2A1608" />
            <circle cx="41.2" cy="36.8" r="1.2" fill="#FFF" />
            <circle cx="60" cy="38" r="3.5" fill="#2A1608" />
            <circle cx="61.2" cy="36.8" r="1.2" fill="#FFF" />
          </>
        )}

        {/* Muzzle */}
        <ellipse cx="50" cy="48" rx="12" ry="9" fill="url(#teddyMuzzle)" />
        <ellipse cx="50" cy="45" rx="3.5" ry="2.5" fill="#42210B" />
        <path d="M 50 47.5 L 50 51 Q 46 53 44 50 M 50 51 Q 54 53 56 50" stroke="#42210B" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Blush cheeks */}
        <ellipse cx="32" cy="45" rx="5" ry="3" fill="#FF80AB" opacity="0.45" />
        <ellipse cx="68" cy="45" rx="5" ry="3" fill="#FF80AB" opacity="0.45" />

        {/* Body */}
        <ellipse cx="50" cy="80" rx="26" ry="28" fill="url(#teddyFur)" />
        <ellipse cx="50" cy="80" rx="15" ry="17" fill="url(#teddyMuzzle)" opacity="0.6" />

        {/* Feet */}
        <ellipse cx="34" cy="104" rx="11" ry="8" fill="url(#teddyFur)" />
        <circle cx="34" cy="104" r="5" fill="#E8A882" opacity="0.8" />
        <ellipse cx="66" cy="104" rx="11" ry="8" fill="url(#teddyFur)" />
        <circle cx="66" cy="104" r="5" fill="#E8A882" opacity="0.8" />

        {/* Left Hand: Waving Paw */}
        <g style={{ transformOrigin: '22px 68px' }}>
          <motion.path
            d="M 26 68 Q 12 55 18 46 Q 26 44 32 58 Z"
            fill="url(#teddyFur)"
            animate={{ rotate: [0, -18, 4, -18, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          />
        </g>

        {/* Right Arm Holding Gift */}
        <path d="M 72 68 Q 82 72 76 84 Q 68 86 64 74 Z" fill="url(#teddyFur)" />

        {/* Wrapped Birthday Gift in paws */}
        <g transform="translate(56, 68)">
          <rect x="0" y="4" width="22" height="20" rx="3" fill="url(#giftBox)" stroke="#FFF" strokeWidth="1" />
          <rect x="8" y="4" width="6" height="20" fill="#E8C77B" />
          <rect x="0" y="11" width="22" height="6" fill="#E8C77B" />
          <path d="M 6 4 C 4 0 11 0 11 4 C 11 0 18 0 16 4" fill="none" stroke="#FFF" strokeWidth="1.8" />
        </g>
      </svg>
    </motion.div>
  );
};

export const CuteBunny: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      <svg width="68" height="88" viewBox="0 0 90 115" className="drop-shadow-md">
        <defs>
          <radialGradient id="bunnyFur" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#F5F3FF" />
            <stop offset="100%" stopColor="#E2DDF5" />
          </radialGradient>
        </defs>

        {/* Ears with natural twitch */}
        <motion.g
          animate={{ rotate: [0, -4, 3, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{ transformOrigin: '32px 36px' }}
        >
          <ellipse cx="32" cy="18" rx="8" ry="18" fill="url(#bunnyFur)" />
          <ellipse cx="32" cy="18" rx="4" ry="12" fill="#FFB6D5" opacity="0.6" />
        </motion.g>

        <motion.g
          animate={{ rotate: [0, 4, -2, 0] }}
          transition={{ repeat: Infinity, duration: 3.2, delay: 0.2, ease: 'easeInOut' }}
          style={{ transformOrigin: '58px 36px' }}
        >
          <ellipse cx="58" cy="18" rx="8" ry="18" fill="url(#bunnyFur)" />
          <ellipse cx="58" cy="18" rx="4" ry="12" fill="#FFB6D5" opacity="0.6" />
        </motion.g>

        {/* Head */}
        <circle cx="45" cy="46" r="22" fill="url(#bunnyFur)" />

        {/* Eyes */}
        {blink ? (
          <>
            <path d="M 34 44 Q 38 48 42 44" stroke="#4A3E56" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 48 44 Q 52 48 56 44" stroke="#4A3E56" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="37" cy="44" r="3.2" fill="#3D314A" />
            <circle cx="38" cy="43" r="1.2" fill="#FFF" />
            <circle cx="53" cy="44" r="3.2" fill="#3D314A" />
            <circle cx="54" cy="43" r="1.2" fill="#FFF" />
          </>
        )}

        {/* Nose & mouth */}
        <polygon points="45,49 42,47 48,47" fill="#FF80AB" />
        <path d="M 45 49 L 45 52 Q 42 54 40 52 M 45 52 Q 48 54 50 52" stroke="#4A3E56" strokeWidth="1.2" fill="none" />

        {/* Blush */}
        <circle cx="30" cy="49" r="4" fill="#FFB6D5" opacity="0.5" />
        <circle cx="60" cy="49" r="4" fill="#FFB6D5" opacity="0.5" />

        {/* Body */}
        <ellipse cx="45" cy="80" rx="20" ry="22" fill="url(#bunnyFur)" />

        {/* Paws offering a flower */}
        <ellipse cx="36" cy="74" rx="6" ry="5" fill="url(#bunnyFur)" />
        <ellipse cx="54" cy="74" rx="6" ry="5" fill="url(#bunnyFur)" />

        {/* Flower offered */}
        <g transform="translate(42, 60)">
          <line x1="3" y1="14" x2="3" y2="4" stroke="#81C784" strokeWidth="2" />
          <circle cx="3" cy="2" r="3" fill="#FFD54F" />
          <circle cx="3" cy="-3" r="2.5" fill="#FF80AB" />
          <circle cx="8" cy="2" r="2.5" fill="#FF80AB" />
          <circle cx="3" cy="7" r="2.5" fill="#FF80AB" />
          <circle cx="-2" cy="2" r="2.5" fill="#FF80AB" />
        </g>

        {/* Feet */}
        <ellipse cx="34" cy="98" rx="8" ry="6" fill="url(#bunnyFur)" />
        <ellipse cx="56" cy="98" rx="8" ry="6" fill="url(#bunnyFur)" />
      </svg>
    </motion.div>
  );
};

export const CuteBabyCloud: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
      transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      <svg width="76" height="52" viewBox="0 0 100 65" className="drop-shadow-md">
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
        </defs>

        {/* Cloud Puff Body */}
        <path
          d="M 25 50 
             A 15 15 0 0 1 18 25 
             A 18 18 0 0 1 45 15 
             A 22 22 0 0 1 80 25 
             A 16 16 0 0 1 85 50 
             Z"
          fill="url(#cloudGrad)"
        />

        {/* Happy Sleeping Eyes */}
        <path d="M 38 34 Q 43 38 48 34" stroke="#343B63" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 56 34 Q 61 38 66 34" stroke="#343B63" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Cute Smiling Mouth */}
        <path d="M 48 42 Q 52 46 56 42" stroke="#343B63" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Rosy Blush */}
        <circle cx="35" cy="38" r="4" fill="#FF80AB" opacity="0.5" />
        <circle cx="69" cy="38" r="4" fill="#FF80AB" opacity="0.5" />
      </svg>
    </motion.div>
  );
};

export const CuteStarCharacter: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      animate={{ rotate: [-6, 6, -6], scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      <svg width="60" height="60" viewBox="0 0 80 80" className="drop-shadow-md">
        <defs>
          <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF59D" />
            <stop offset="60%" stopColor="#FFD54F" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>
        </defs>

        {/* Star Body */}
        <polygon
          points="40,5 50,28 75,30 55,48 62,72 40,58 18,72 25,48 5,30 30,28"
          fill="url(#starGrad)"
          stroke="#FFE082"
          strokeWidth="1.5"
        />

        {/* Star Eyes */}
        <circle cx="34" cy="38" r="2.8" fill="#3E2723" />
        <circle cx="35" cy="37" r="1" fill="#FFF" />
        <circle cx="46" cy="38" r="2.8" fill="#3E2723" />
        <circle cx="47" cy="37" r="1" fill="#FFF" />

        {/* Smile */}
        <path d="M 37 45 Q 40 49 43 45" stroke="#3E2723" strokeWidth="1.8" fill="none" strokeLinecap="round" />

        {/* Star Blush */}
        <circle cx="30" cy="42" r="3" fill="#FF80AB" opacity="0.5" />
        <circle cx="50" cy="42" r="3" fill="#FF80AB" opacity="0.5" />

        {/* Tiny Waving Arm */}
        <motion.path
          d="M 54 44 Q 68 36 65 30"
          stroke="#FFB300"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          animate={{ rotate: [0, -20, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          style={{ transformOrigin: '54px 44px' }}
        />
      </svg>
    </motion.div>
  );
};

export const CuteBirdBranch: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <motion.div
      animate={{ y: [0, -3, 0], rotate: [0, 1.5, 0] }}
      transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut' }}
      className={`relative flex flex-col items-center select-none ${className}`}
    >
      <svg width="74" height="64" viewBox="0 0 90 80" className="drop-shadow-md">
        <defs>
          <linearGradient id="birdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#64B5F6" />
          </linearGradient>
        </defs>

        {/* Branch with flower */}
        <path d="M 5 62 Q 40 58 85 64" stroke="#8D6E63" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <circle cx="25" cy="56" r="3" fill="#81C784" />
        <circle cx="70" cy="60" r="4" fill="#FF80AB" />
        <circle cx="70" cy="60" r="1.5" fill="#FFE082" />

        {/* Bird Body */}
        <ellipse cx="45" cy="45" rx="16" ry="13" fill="url(#birdGrad)" />
        <circle cx="54" cy="38" r="10" fill="url(#birdGrad)" />
        {/* Yellow tummy */}
        <ellipse cx="46" cy="48" rx="10" ry="8" fill="#FFF59D" />

        {/* Beak */}
        <polygon points="64,37 72,40 64,43" fill="#FFA726" />

        {/* Eye */}
        <circle cx="57" cy="36" r="2.2" fill="#263238" />
        <circle cx="57.8" cy="35.2" r="0.8" fill="#FFF" />

        {/* Wing with flutter */}
        <motion.path
          d="M 38 42 Q 30 32 42 36 Z"
          fill="#42A5F5"
          animate={{ rotate: [0, -25, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          style={{ transformOrigin: '42px 38px' }}
        />

        {/* Tail */}
        <polygon points="29,48 20,44 24,54" fill="#42A5F5" />
      </svg>
    </motion.div>
  );
};
