/**
 * Web Audio API Engine for Karthika's Magical Birthday World
 * Provides real-time procedural Violin + Piano background music
 * and rich magical sound effects (pops, chimes, fireworks, rustles, blowing, fanfare).
 */

class BirthdayAudioEngine {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private isMuted = false;
  private volume = 0.65;
  private musicTimeoutId: number | null = null;
  private melodyIndex = 0;
  private gainMaster: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private listeners: ((state: { isPlaying: boolean; isMuted: boolean; volume: number }) => void)[] = [];

  constructor() {
    // Context is created lazily on first user gesture to comply with browser autoplay policies
  }

  private init() {
    if (this.ctx) return;
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtxClass();

    this.gainMaster = this.ctx.createGain();
    this.gainMaster.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    this.gainMaster.connect(this.ctx.destination);

    this.musicGain = this.ctx.createGain();
    this.musicGain.gain.setValueAtTime(0.45, this.ctx.currentTime);
    this.musicGain.connect(this.gainMaster);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.sfxGain.connect(this.gainMaster);
  }

  private notify() {
    const state = {
      isPlaying: this.isMusicPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
    };
    this.listeners.forEach((l) => l(state));
  }

  public subscribe(listener: (state: { isPlaying: boolean; isMuted: boolean; volume: number }) => void) {
    this.listeners.push(listener);
    listener({
      isPlaying: this.isMusicPlaying,
      isMuted: this.isMuted,
      volume: this.volume,
    });
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public resume() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.gainMaster && this.ctx) {
      this.gainMaster.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public getVolume() {
    return this.volume;
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.gainMaster && this.ctx) {
      this.gainMaster.gain.setTargetAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime, 0.05);
    }
    this.notify();
  }

  public getMuted() {
    return this.isMuted;
  }

  public getIsPlaying() {
    return this.isMusicPlaying;
  }

  // --- BACKGROUND MUSIC: VIOLIN & PIANO HAPPY BIRTHDAY MELODY ---
  public startMusic() {
    this.resume();
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;
    this.notify();
    this.playNextMusicPhrase();
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimeoutId) {
      window.clearTimeout(this.musicTimeoutId);
      this.musicTimeoutId = null;
    }
    this.notify();
  }

  public toggleMusic() {
    if (this.isMusicPlaying) {
      this.stopMusic();
    } else {
      this.startMusic();
    }
  }

  private playNextMusicPhrase() {
    if (!this.isMusicPlaying || !this.ctx || !this.musicGain) return;

    // Pitch Frequencies (Key of F Major - warm & gentle)
    const C4 = 261.63, D4 = 293.66, E4 = 329.63, F4 = 349.23, G4 = 392.00, A4 = 440.00, Bb4 = 466.16, C5 = 523.25, D5 = 587.33, E5 = 659.25, F5 = 698.46;
    
    // Notes for "Happy Birthday to you, Happy Birthday to you, Happy Birthday dear Karthika, Happy Birthday to you!"
    // Plus gentle chords
    interface MelodyNote {
      note: number;
      duration: number; // in beats
      pianoChord?: number[];
    }

    const melody: MelodyNote[] = [
      // Phrase 1: Hap-py Birth-day to you
      { note: C4, duration: 0.75, pianoChord: [F4, A4, C5] },
      { note: C4, duration: 0.25 },
      { note: D4, duration: 1.0 },
      { note: C4, duration: 1.0 },
      { note: F4, duration: 1.0, pianoChord: [A4, C5, F5] },
      { note: E4, duration: 2.0, pianoChord: [C4, G4, Bb4] },

      // Phrase 2: Hap-py Birth-day to you
      { note: C4, duration: 0.75, pianoChord: [C4, G4, Bb4] },
      { note: C4, duration: 0.25 },
      { note: D4, duration: 1.0 },
      { note: C4, duration: 1.0 },
      { note: G4, duration: 1.0, pianoChord: [Bb4, D5, G4] },
      { note: F4, duration: 2.0, pianoChord: [F4, A4, C5] },

      // Phrase 3: Hap-py Birth-day dear Kar-thi-ka
      { note: C4, duration: 0.75, pianoChord: [F4, A4, C5] },
      { note: C4, duration: 0.25 },
      { note: C5, duration: 1.0, pianoChord: [F4, A4, C5] },
      { note: A4, duration: 1.0 },
      { note: F4, duration: 1.0, pianoChord: [Bb4, D5, F5] },
      { note: E4, duration: 1.0 },
      { note: D4, duration: 2.0, pianoChord: [Bb4, D5, F5] },

      // Phrase 4: Hap-py Birth-day to you!
      { note: Bb4, duration: 0.75, pianoChord: [C4, G4, Bb4] },
      { note: Bb4, duration: 0.25 },
      { note: A4, duration: 1.0 },
      { note: F4, duration: 1.0, pianoChord: [F4, A4, C5] },
      { note: G4, duration: 1.0 },
      { note: F4, duration: 2.5, pianoChord: [F4, A4, C5, F5] },
    ];

    const current = melody[this.melodyIndex];
    const beatSec = 0.58; // gentle warm tempo (approx 103 BPM)
    const noteDuration = current.duration * beatSec;

    const now = this.ctx.currentTime;

    // Play Sweet Flute Melody Note (one octave higher for airy brilliance)
    this.synthesizeFluteNote(current.note * 2, now, noteDuration * 0.98);

    // Play Warm Piano Melody & Accompaniment Chord
    this.synthesizePianoNote(current.note, now + 0.01, noteDuration * 1.2);
    if (current.pianoChord) {
      current.pianoChord.forEach((pitch, i) => {
        this.synthesizePianoNote(pitch / 2, now + i * 0.025, noteDuration * 1.9);
      });
    }

    this.melodyIndex = (this.melodyIndex + 1) % melody.length;
    this.musicTimeoutId = window.setTimeout(() => {
      this.playNextMusicPhrase();
    }, noteDuration * 1000);
  }

  /**
   * Synthesize a gentle, sweet Concert Flute sound:
   * Uses fundamental sine + warm 2nd & 3rd harmonics, soft breath air component,
   * natural embouchure attack, and graceful delayed 5Hz human vibrato.
   */
  private synthesizeFluteNote(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.musicGain) return;

    // 1. Primary Flute Tone (Pure Fundamental)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq * 0.998, startTime);
    osc1.frequency.exponentialRampToValueAtTime(freq, startTime + 0.04); // natural breath pitch rise

    // 2. Sweet 2nd Harmonic Overturn (Octave shimmer)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, startTime);
    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.08, startTime);

    // 3. Human Flute Vibrato LFO (5.2 Hz) with natural onset delay
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    vibrato.frequency.setValueAtTime(5.2, startTime);
    vibratoGain.gain.setValueAtTime(0, startTime);
    // Vibrato swells in gently after note initiation
    vibratoGain.gain.linearRampToValueAtTime(1.8, startTime + 0.28);
    vibrato.connect(osc1.frequency);
    vibrato.connect(osc2.frequency);

    // 4. Breathy embouchure air component (filtered noise)
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
    }
    const breath = this.ctx.createBufferSource();
    breath.buffer = noiseBuffer;
    const breathFilter = this.ctx.createBiquadFilter();
    breathFilter.type = 'bandpass';
    breathFilter.frequency.setValueAtTime(Math.min(freq * 2.2, 3800), startTime);
    breathFilter.Q.setValueAtTime(3.0, startTime);
    const breathGain = this.ctx.createGain();
    breathGain.gain.setValueAtTime(0.02, startTime);
    breathGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);

    // 5. Flute Master Envelope (soft tonguing attack and peaceful breath release)
    const noteGain = this.ctx.createGain();
    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(0.22, startTime + 0.05); // soft breath attack
    noteGain.gain.setValueAtTime(0.20, startTime + duration - 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    // Connections
    osc1.connect(noteGain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(noteGain);

    breath.connect(breathFilter);
    breathFilter.connect(breathGain);
    breathGain.connect(noteGain);

    noteGain.connect(this.musicGain);

    // Start & Stop
    osc1.start(startTime);
    osc2.start(startTime);
    vibrato.start(startTime);
    breath.start(startTime);

    osc1.stop(startTime + duration + 0.05);
    osc2.stop(startTime + duration + 0.05);
    vibrato.stop(startTime + duration + 0.05);
  }

  /**
   * Synthesize a warm, acoustic Piano chord tone:
   * Uses stacked sine and soft triangle oscillators with percussive attack and natural string damping
   */
  private synthesizePianoNote(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.musicGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, startTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, startTime); // 1st overtone sparkle

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1800, startTime);
    filter.frequency.exponentialRampToValueAtTime(300, startTime + duration);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.14, startTime + 0.015); // hammer strike
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.05);
    osc2.stop(startTime + duration + 0.05);
  }

  // --- SOUND EFFECTS ---

  /** Soft balloon pop with sparkly dispersion */
  public playBalloonPop() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    // Fast noise burst
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.Q.setValueAtTime(1.2, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(now);

    // Followed by sweet little sparkle pitch
    this.playTwinkle(now + 0.03, 1174.66); // D6
  }

  /** Translucent bubble pop with iridescent plink */
  public playBubblePop() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = 600 + Math.random() * 400;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, now + 0.08);

    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  /** Crystal magical chime */
  public playChime() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const pitches = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
    pitches.forEach((freq, i) => {
      this.playTwinkle(now + i * 0.04, freq);
    });
  }

  /** Single pure bell sparkle */
  private playTwinkle(time: number, freq: number) {
    if (!this.ctx || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.45);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(time);
    osc.stop(time + 0.5);
  }

  /** Page transition whoosh */
  public playPageTransition() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  /** Subtle button click sound */
  public playClick() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  /** Letter / Envelope opening paper rustle */
  public playLetterOpen() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    // Filtered pink noise for paper rustle
    const bufferSize = this.ctx.sampleRate * 0.35;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.linearRampToValueAtTime(2600, now + 0.25);
    filter.Q.setValueAtTime(2, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(now);

    // Follow with soft chime
    setTimeout(() => this.playTwinkle(this.ctx?.currentTime || 0, 880), 200);
  }

  /** Handwriting pen sound */
  public playPenScratch() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1800 + Math.random() * 400, now);

    gain.gain.setValueAtTime(0.04, now);
    gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.035);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  /** 3D Card flip sound */
  public playCardFlip() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  /** Flower blooming glissando */
  public playFlowerBloom() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const chords = [440, 554.37, 659.25, 880, 1108.73];
    chords.forEach((note, i) => {
      this.playTwinkle(now + i * 0.06, note);
    });
  }

  /** Candle blowing breath + extinguish */
  public playCandleBlow() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    // Breath noise
    const bufferSize = this.ctx.sampleRate * 0.45;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.linearRampToValueAtTime(1200, now + 0.2);
    filter.frequency.linearRampToValueAtTime(400, now + 0.4);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(now);

    // Extinguish puff
    setTimeout(() => {
      this.playBubblePop();
    }, 280);
  }

  /** Gift box open magic burst */
  public playGiftOpen() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const arpeggio = [392, 493.88, 587.33, 783.99, 987.77, 1174.66];
    arpeggio.forEach((note, i) => {
      this.playTwinkle(now + i * 0.045, note);
    });
  }

  /** Grand finale fanfare */
  public playGrandFanfare() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;

    const fanfareChords = [
      { pitches: [349.23, 440, 523.25], time: now, duration: 0.3 },
      { pitches: [349.23, 440, 523.25], time: now + 0.35, duration: 0.3 },
      { pitches: [349.23, 440, 523.25], time: now + 0.7, duration: 0.3 },
      { pitches: [466.16, 587.33, 698.46], time: now + 1.05, duration: 0.9 },
    ];

    fanfareChords.forEach((chord) => {
      chord.pitches.forEach((freq) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, chord.time);

        gain.gain.setValueAtTime(0.01, chord.time);
        gain.gain.linearRampToValueAtTime(0.2, chord.time + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, chord.time + chord.duration);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(chord.time);
        osc.stop(chord.time + chord.duration + 0.05);
      });
    });
  }

  /** Portal opening ethereal shimmer sound */
  public playPortalOpen() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const portalChords = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
    portalChords.forEach((freq, idx) => {
      this.playTwinkle(now + idx * 0.08, freq);
    });
  }

  /** Satin curtain opening whoosh */
  public playCurtainOpen() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(1600, now + 0.3);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);
    noise.start(now);
  }

  /** Cute character gentle bounce */
  public playCharacterBounce() {
    this.resume();
    if (!this.ctx || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.1);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.13);
  }
}

export const audio = new BirthdayAudioEngine();
