import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BalloonPopReveal } from '../reveals/BalloonPopReveal';
import { audio } from '../../utils/audio';
import { fireWelcomeConfetti } from '../../utils/confetti';
import { Lock, Unlock, Eye, EyeOff, RotateCcw, Sparkles, ArrowRight, Delete } from 'lucide-react';

interface Page2PasswordGateProps {
  onNext: () => void;
}

export const Page2PasswordGate: React.FC<Page2PasswordGateProps> = ({ onNext }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);

  const handleKeypadPress = (digit: string) => {
    audio.playClick();
    if (password.length < 8) {
      const nextPass = password + digit;
      setPassword(nextPass);
      setErrorMsg('');
      if (nextPass.length === 8 && nextPass === '10112007') {
        triggerUnlock();
      }
    }
  };

  const handleBackspace = () => {
    audio.playClick();
    setPassword((prev) => prev.slice(0, -1));
    setErrorMsg('');
  };

  const handleClear = () => {
    audio.playClick();
    setPassword('');
    setErrorMsg('');
  };

  const triggerUnlock = () => {
    audio.playPortalOpen();
    audio.playChime();
    setIsUnlocked(true);
    setErrorMsg('');
    fireWelcomeConfetti();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (password.trim() === '10112007') {
      triggerUnlock();
    } else {
      audio.playClick();
      setShake(true);
      setErrorMsg("Almost there! Enter Karthika's birthdate DDMMYYYY (10 Nov 2007) ✨");
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-6 max-w-xl mx-auto text-center z-10">
      {/* Decorative Floral & Butterfly Header */}
      <div className="flex items-center justify-center gap-3 mb-2 select-none">
        <span className="text-xl">🌸</span>
        <span className="text-xs font-bold text-[#E8C77B] tracking-widest uppercase bg-white/80 px-4 py-1.5 rounded-full border border-[#E8C77B]/50 shadow-xs">
          Enchanted Doorway · Passcode Protected
        </span>
        <span className="text-xl">🦋</span>
      </div>

      {/* Balloon reveal for initial clue */}
      <BalloonPopReveal
        balloonColor="lavender"
        balloonText="Pop for Clue 🎈"
        delayMs={300}
        autoPop={false}
      >
        <div className="p-3.5 px-6 rounded-2xl glass-card border border-[#E8DFFF] shadow-xs max-w-md mx-auto mb-2">
          <p className="text-xs sm:text-sm font-medium text-[#343B63]">
            “Something special is waiting behind this little door...”
          </p>
        </div>
      </BalloonPopReveal>

      {/* Elegant Architectural Magical Door Frame */}
      <motion.div
        animate={shake ? { x: [-10, 10, -6, 6, -3, 3, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="w-full relative p-5 sm:p-7 rounded-[32px] glass-panel border-2 border-white/90 shadow-[0_25px_60px_rgba(255,182,213,0.35)] flex flex-col items-center overflow-hidden"
      >
        {/* Soft magical door archway glow */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#FFE082]/30 via-[#FFD6E7]/20 to-transparent pointer-events-none" />

        {/* 3D Door Panels Graphic with Golden Carvings */}
        <div className="relative w-full max-w-sm h-32 sm:h-36 mb-4 perspective-1000 flex justify-center">
          {/* Left Door Leaf */}
          <motion.div
            animate={isUnlocked ? { rotateY: -110, opacity: 0.2 } : { rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left center' }}
            className="w-1/2 h-full rounded-l-2xl bg-gradient-to-r from-[#FFF5F8] via-[#FFE8F0] to-[#FFD6E7] border-2 border-r-0 border-[#E8C77B]/70 shadow-md p-2 flex flex-col justify-between"
          >
            <div className="flex justify-between text-xs text-[#E8C77B]">
              <span>🌸</span>
              <span>✨</span>
            </div>
            <div className="border border-dashed border-[#E8C77B]/50 rounded-xl h-16 flex items-center justify-center">
              <span className="text-lg">🌿</span>
            </div>
            <div className="text-right text-xs text-[#E8C77B]">✨</div>
          </motion.div>

          {/* Right Door Leaf */}
          <motion.div
            animate={isUnlocked ? { rotateY: 110, opacity: 0.2 } : { rotateY: 0, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'right center' }}
            className="w-1/2 h-full rounded-r-2xl bg-gradient-to-l from-[#FFF5F8] via-[#FFE8F0] to-[#FFD6E7] border-2 border-l-0 border-[#E8C77B]/70 shadow-md p-2 flex flex-col justify-between"
          >
            <div className="flex justify-between text-xs text-[#E8C77B]">
              <span>✨</span>
              <span>🌸</span>
            </div>
            <div className="border border-dashed border-[#E8C77B]/50 rounded-xl h-16 flex items-center justify-center">
              <span className="text-lg">🌿</span>
            </div>
            <div className="text-left text-xs text-[#E8C77B]">✨</div>
          </motion.div>

          {/* Golden Center Lock Badge */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <motion.div
              animate={
                isUnlocked
                  ? { scale: [1, 1.4, 1.2], rotate: [0, -15, 0] }
                  : { scale: [1, 1.06, 1] }
              }
              transition={{ repeat: isUnlocked ? 0 : Infinity, duration: 2.2 }}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-700 ${
                isUnlocked
                  ? 'bg-gradient-to-tr from-[#E8C77B] to-[#FFE082] text-white shadow-[0_0_35px_rgba(232,199,123,0.95)]'
                  : 'bg-gradient-to-tr from-[#FFFDF5] to-[#FFE8A3] text-[#E8C77B] border-2 border-[#E8C77B] shadow-[0_0_20px_rgba(232,199,123,0.5)]'
              }`}
            >
              {isUnlocked ? (
                <Unlock className="w-8 h-8 text-white animate-bounce" />
              ) : (
                <Lock className="w-7 h-7 text-[#C9A24D]" />
              )}
            </motion.div>
          </div>
        </div>

        <h3 className="text-lg sm:text-2xl font-bold font-playfair text-[#343B63] mb-1">
          {isUnlocked ? 'The Doorways of Joy Have Opened!' : 'Enter The Secret Birthday Passcode'}
        </h3>
        <p className="text-xs text-[#87CEEB] font-bold tracking-wider uppercase mb-4">
          Date of Birth Hint: DDMMYYYY
        </p>

        {/* Unlocked State Celebration vs Keypad Input */}
        <AnimatePresence mode="wait">
          {isUnlocked ? (
            <motion.div
              key="unlocked-message"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 220 }}
              className="flex flex-col items-center gap-2.5 py-3 w-full"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#FFFDF0] to-[#FFF5F8] border border-[#E8C77B]/60 shadow-2xs text-[11px] font-bold tracking-widest text-[#B45309] uppercase">
                <Sparkles className="w-3 h-3 text-[#E8C77B]" />
                <span>Passcode Accepted</span>
                <Sparkles className="w-3 h-3 text-[#E8C77B]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#343B63] font-playfair tracking-tight">
                The Magic Is Unlocked
              </h2>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#E8C77B] to-transparent my-1 opacity-70" />
              <p className="text-xs sm:text-sm text-[#343B63]/85 font-normal max-w-sm leading-relaxed">
                The enchanted door has revealed the grand celebration waiting ahead.
              </p>

              <button
                onClick={() => {
                  audio.playPageTransition();
                  onNext();
                }}
                className="mt-2 px-8 py-3.5 rounded-2xl glass-btn font-bold text-sm sm:text-base text-[#343B63] flex items-center gap-2 cursor-pointer shadow-md group hover:scale-105 active:scale-95 transition-transform"
              >
                <span>Enter The Celebration</span>
                <ArrowRight className="w-4 h-4 text-[#FF4081] group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ) : (
            <div className="w-full flex flex-col items-center gap-3">
              {/* Display Box for Entered Digits */}
              <div className="relative w-full max-w-xs">
                <input
                  type={showPassword ? 'text' : 'password'}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={8}
                  placeholder="• • • • • • • •"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-5 pr-14 py-3 rounded-2xl bg-white/95 border-2 border-[#E8C77B]/60 focus:border-[#E8C77B] focus:ring-2 focus:ring-[#E8C77B]/30 outline-none text-[#343B63] font-mono tracking-[0.3em] text-center text-lg placeholder:text-[#343B63]/30 shadow-inner"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide' : 'Show'}
                    className="p-1.5 text-gray-400 hover:text-[#E8C77B] rounded-full cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-[#FF4081] font-semibold bg-[#FFE5EC] px-3.5 py-1.5 rounded-xl border border-[#FFB6D5]"
                >
                  {errorMsg}
                </motion.p>
              )}

              {/* Attractive Number Keypad Grid (3x4) */}
              <div className="grid grid-cols-3 gap-2 w-full max-w-xs my-1 select-none">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                  <button
                    key={digit}
                    type="button"
                    onClick={() => handleKeypadPress(digit)}
                    className="h-12 rounded-xl bg-white/85 hover:bg-white border border-[#FFD6E7] font-bold text-base text-[#343B63] shadow-xs cursor-pointer hover:border-[#E8C77B] active:scale-95 transition-all flex items-center justify-center"
                  >
                    {digit}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleClear}
                  title="Clear All"
                  className="h-12 rounded-xl bg-white/70 hover:bg-white border border-[#FFD6E7] font-semibold text-xs text-gray-500 shadow-xs cursor-pointer active:scale-95 transition-all flex items-center justify-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleKeypadPress('0')}
                  className="h-12 rounded-xl bg-white/85 hover:bg-white border border-[#FFD6E7] font-bold text-base text-[#343B63] shadow-xs cursor-pointer hover:border-[#E8C77B] active:scale-95 transition-all flex items-center justify-center"
                >
                  0
                </button>
                <button
                  type="button"
                  onClick={handleBackspace}
                  title="Backspace"
                  className="h-12 rounded-xl bg-white/70 hover:bg-white border border-[#FFD6E7] font-semibold text-xs text-gray-500 shadow-xs cursor-pointer active:scale-95 transition-all flex items-center justify-center"
                >
                  <Delete className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Submit Button & Birthday Clue Shortcut */}
              <div className="flex flex-col items-center gap-2 w-full max-w-xs mt-1">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="w-full py-3 px-6 rounded-2xl glass-btn font-bold text-sm sm:text-base text-[#343B63] flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-98 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#E8C77B]" />
                  <span>Unlock The Magic</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPassword('10112007');
                    setErrorMsg('');
                  }}
                  className="text-[11px] text-[#87CEEB] hover:text-[#343B63] underline decoration-dotted transition-colors cursor-pointer"
                >
                  Autofill Birthdate (10112007)
                </button>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
