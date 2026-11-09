import confetti from 'canvas-confetti';

// Palette: Blush pink, Cotton candy, Baby blue, Sky blue, Champagne gold, Pure white, Lavender
const PASTEL_COLORS = ['#FFD6E7', '#FFB6D5', '#BDE7FF', '#87CEEB', '#E8C77B', '#FFFFFF', '#E8DFFF'];
const GOLDEN_COLORS = ['#E8C77B', '#FFD15C', '#FFE8A3', '#FFFFFF', '#FFB6D5'];
const CELESTIAL_ROSE_COLORS = ['#FFD6E7', '#FFB6D5', '#E8C77B', '#87CEEB', '#FFFFFF'];

/** Standard gentle celebratory burst */
export function fireGentleConfetti() {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { y: 0.75 },
    colors: PASTEL_COLORS,
    disableForReducedMotion: true,
    scalar: 0.9,
  });
}

/** Page 1: Welcome confetti burst (pink and blue) */
export function fireWelcomeConfetti() {
  confetti({
    particleCount: 80,
    spread: 80,
    origin: { y: 0.65 },
    colors: ['#FFB6D5', '#FFD6E7', '#BDE7FF', '#87CEEB', '#FFFFFF'],
    ticks: 250,
    gravity: 0.8,
    scalar: 1.1,
  });
}

/** Page 3: Dramatic Birthday reveal burst with golden particles */
export function fireBirthdayRevealConfetti() {
  // Dual side cannons
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: PASTEL_COLORS,
    ticks: 300,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: GOLDEN_COLORS,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.4,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: CELESTIAL_ROSE_COLORS,
  });
}

/** Page 8: Candle blow-out celebratory scatter */
export function fireCandleConfetti() {
  // Center fountain
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.55 },
    colors: ['#FFD15C', '#E8C77B', '#FFB6D5', '#FFFFFF', '#BDE7FF'],
    startVelocity: 40,
    scalar: 1.15,
    gravity: 0.9,
  });
}

/** Page 10: Secret gift opening eruption */
export function fireGiftConfetti() {
  confetti({
    particleCount: 150,
    spread: 110,
    origin: { y: 0.6 },
    colors: ['#E8C77B', '#FFB6D5', '#BDE7FF', '#E8DFFF', '#FFFFFF'],
    startVelocity: 50,
    scalar: 1.25,
    ticks: 280,
  });
}

/** Page 11: Grand Birthday Finale Multi-stage Fireworks & Confetti */
export function fireGrandFinaleConfetti() {
  const duration = 4.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 35, spread: 360, ticks: 120, zIndex: 999 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval = window.setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 60 * (timeLeft / duration);

    // Left cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.35), y: Math.random() - 0.2 },
      colors: PASTEL_COLORS,
    });
    // Right cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.65, 0.9), y: Math.random() - 0.2 },
      colors: GOLDEN_COLORS,
    });
    // Center sparkle burst
    confetti({
      ...defaults,
      particleCount: Math.floor(particleCount * 0.7),
      origin: { x: 0.5, y: randomInRange(0.3, 0.6) },
      colors: CELESTIAL_ROSE_COLORS,
      scalar: 1.2,
    });
  }, 300);
}
