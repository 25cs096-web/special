import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  sway: number;
  delay: number;
}

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  rotateStart: number;
  size: number;
  type: 'rose' | 'heart' | 'star';
}

interface Balloon {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  type: 'glossy' | 'gold' | 'star-inside' | 'lavender' | 'blue';
}

export const AmbientWorld: React.FC = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [poppedBubbles, setPoppedBubbles] = useState<Set<number>>(new Set());

  // Generate initial bubbles with realistic positions and floating parameters
  useEffect(() => {
    const initialBubbles: Bubble[] = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      x: 5 + (i * 7) + (Math.random() * 5),
      y: 105 + Math.random() * 40,
      size: 26 + Math.random() * 32,
      speed: 12 + Math.random() * 10,
      sway: 15 + Math.random() * 20,
      delay: i * 0.8,
    }));
    setBubbles(initialBubbles);
  }, []);

  // Falling petals, hearts & stars
  const fallingItems: Petal[] = React.useMemo(() => {
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 8 + Math.random() * 7,
      rotateStart: Math.random() * 360,
      size: 14 + Math.random() * 14,
      type: i % 3 === 0 ? 'rose' : i % 3 === 1 ? 'heart' : 'star',
    }));
  }, []);

  // Ambient floating background balloons
  const ambientBalloons: Balloon[] = React.useMemo(() => {
    const colors = [
      { color: 'from-[#FFB6D5] to-[#FFD6E7]', type: 'glossy' as const },
      { color: 'from-[#BDE7FF] to-[#87CEEB]', type: 'blue' as const },
      { color: 'from-[#E8C77B] to-[#FFF3C4]', type: 'gold' as const },
      { color: 'from-[#E8DFFF] to-[#C9BAFF]', type: 'lavender' as const },
      { color: 'from-[#FFD6E7]/80 to-[#BDE7FF]/60', type: 'star-inside' as const },
    ];
    return Array.from({ length: 9 }).map((_, i) => ({
      id: i,
      left: 4 + (i * 11) + (Math.random() * 4),
      delay: i * 2.2,
      duration: 18 + Math.random() * 8,
      color: colors[i % colors.length].color,
      type: colors[i % colors.length].type,
      size: 40 + Math.random() * 24,
    }));
  }, []);

  const handlePopBubble = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    audio.playBubblePop();
    setPoppedBubbles((prev) => new Set([...prev, id]));
    // Respawn bubble after 4 seconds
    setTimeout(() => {
      setPoppedBubbles((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 4000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dreamy Pastel Sky Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF0F6]/90 via-[#F7FAFF]/80 to-[#FFF5FA]/90" />
      
      {/* Soft atmospheric blurred clouds */}
      <div className="absolute -top-24 left-1/4 w-[500px] h-[300px] bg-[#FFD6E7]/30 rounded-full blur-3xl" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[350px] bg-[#BDE7FF]/35 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-[550px] h-[300px] bg-[#E8DFFF]/35 rounded-full blur-3xl" />

      {/* Twinkling 4-point & 5-point stars */}
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute text-[#E8C77B] animate-twinkle select-none"
          style={{
            top: `${(i * 17) % 95}%`,
            left: `${(i * 23 + 7) % 96}%`,
            animationDelay: `${(i * 0.4) % 3}s`,
            animationDuration: `${2.5 + (i % 3) * 0.7}s`,
            fontSize: `${10 + (i % 3) * 6}px`,
            opacity: 0.75,
          }}
        >
          {i % 2 === 0 ? '✦' : '✧'}
        </div>
      ))}

      {/* Ambient Rising 3D Balloons in Background */}
      {ambientBalloons.map((b) => (
        <div
          key={`balloon-${b.id}`}
          className="absolute pointer-events-none opacity-45 transition-transform"
          style={{
            left: `${b.left}%`,
            bottom: '-120px',
            animation: `ambientRise ${b.duration}s linear infinite`,
            animationDelay: `${b.delay}s`,
            zIndex: 1,
          }}
        >
          <div
            className={`relative rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-br ${b.color} shadow-lg`}
            style={{
              width: `${b.size}px`,
              height: `${b.size * 1.25}px`,
              boxShadow: b.type === 'gold' 
                ? 'inset -4px -6px 12px rgba(184, 134, 11, 0.4), inset 4px 6px 12px rgba(255, 255, 255, 0.8), 0 8px 16px rgba(232, 199, 123, 0.3)'
                : 'inset -4px -6px 10px rgba(0,0,0,0.1), inset 4px 6px 10px rgba(255,255,255,0.7), 0 8px 20px rgba(255, 182, 213, 0.25)',
            }}
          >
            {/* Highlight gleam */}
            <div className="absolute top-2 left-2 w-3 h-4 rounded-full bg-white/70 blur-[1px]" />
            {/* Transparent balloon with tiny star inside */}
            {b.type === 'star-inside' && (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-[#E8C77B] animate-pulse">
                ⭐
              </div>
            )}
            {/* Balloon knot and delicate hanging ribbon */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1.5 bg-[#FFB6D5] rounded-sm" />
            <div 
              className="absolute top-full left-1/2 w-[1px] h-20 bg-gradient-to-b from-[#FFB6D5]/60 to-transparent"
              style={{
                transformOrigin: 'top center',
                animation: 'ribbonSway 3s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      ))}

      {/* Falling Rose Petals, Hearts, and Light Particles */}
      {fallingItems.map((p) => (
        <div
          key={`petal-${p.id}`}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${p.left}%`,
            top: '-40px',
            animation: `fallingPetal ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            zIndex: 2,
          }}
        >
          {p.type === 'rose' && (
            <div 
              className="w-4 h-5 rounded-[70%_30%_60%_40%] bg-gradient-to-br from-[#FFD6E7] to-[#FF80AB] opacity-75 shadow-sm transform rotate-45"
              style={{ transform: `rotate(${p.rotateStart}deg)` }}
            />
          )}
          {p.type === 'heart' && (
            <span className="text-sm opacity-65 text-[#FFB6D5] drop-shadow-sm">
              🌸
            </span>
          )}
          {p.type === 'star' && (
            <span className="text-xs text-[#E8C77B] opacity-80">
              ✨
            </span>
          )}
        </div>
      ))}

      {/* Floating Butterflies with Wing Flapping and Sparkle Trails */}
      <div 
        className="absolute top-20 left-12 animate-float-sway z-10 hidden sm:block"
        style={{ animationDuration: '7s' }}
      >
        <div className="relative flex items-center">
          <div className="animate-wing-flap origin-right text-xl">🦋</div>
          <span className="text-[10px] text-[#E8C77B] opacity-75 animate-ping ml-1">✨</span>
        </div>
      </div>
      <div 
        className="absolute bottom-28 right-16 animate-float-gentle z-10 hidden md:block"
        style={{ animationDuration: '6s', animationDelay: '1.5s' }}
      >
        <div className="relative flex items-center">
          <div className="animate-wing-flap origin-right text-xl transform -scale-x-100">🦋</div>
          <span className="text-[10px] text-[#E8C77B] opacity-75 animate-ping mr-1">✨</span>
        </div>
      </div>

      {/* Interactive Floating Soap Bubbles (User can click to pop!) */}
      {bubbles.map((b) => {
        if (poppedBubbles.has(b.id)) {
          return (
            <div
              key={`pop-burst-${b.id}`}
              className="absolute z-20 pointer-events-none text-xs text-[#FFB6D5] animate-ping"
              style={{ left: `${b.x}%`, top: '40%' }}
            >
              ✨ 🫧
            </div>
          );
        }

        return (
          <button
            key={`bubble-${b.id}`}
            onClick={(e) => handlePopBubble(b.id, e)}
            title="Pop me! 🫧"
            className="absolute rounded-full pointer-events-auto cursor-pointer focus:outline-none transition-transform hover:scale-110 active:scale-90"
            style={{
              left: `${b.x}%`,
              bottom: '-80px',
              width: `${b.size}px`,
              height: `${b.size}px`,
              animation: `riseBubble ${b.speed}s ease-in-out infinite`,
              animationDelay: `${b.delay}s`,
              background: 'radial-gradient(circle at 35% 35%, rgba(255, 255, 255, 0.8) 0%, rgba(189, 231, 255, 0.4) 40%, rgba(255, 182, 213, 0.3) 70%, rgba(232, 223, 255, 0.4) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.7)',
              boxShadow: 'inset -2px -2px 6px rgba(255, 182, 213, 0.4), inset 2px 2px 6px rgba(189, 231, 255, 0.5), 0 4px 12px rgba(189, 231, 255, 0.3)',
              zIndex: 3,
            }}
          >
            {/* Iridescent highlight */}
            <div className="absolute top-1 left-2 w-2 h-2 rounded-full bg-white/90" />
            <div className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-[#FFB6D5]/60" />
          </button>
        );
      })}

      <style>{`
        @keyframes ambientRise {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.55;
          }
          90% {
            opacity: 0.55;
          }
          100% {
            transform: translateY(-115vh) translateX(30px) rotate(8deg);
            opacity: 0;
          }
        }
        @keyframes ribbonSway {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
        }
        @keyframes fallingPetal {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          15% { opacity: 0.85; }
          50% {
            transform: translateY(50vh) translateX(25px) rotate(180deg);
          }
          85% { opacity: 0.85; }
          100% {
            transform: translateY(105vh) translateX(-20px) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes riseBubble {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% { opacity: 0.75; }
          50% {
            transform: translateY(-50vh) translateX(15px);
          }
          90% { opacity: 0.75; }
          100% {
            transform: translateY(-110vh) translateX(-15px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
