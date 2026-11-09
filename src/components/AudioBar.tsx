import React, { useState, useEffect } from 'react';
import { audio } from '../utils/audio';
import { Volume2, VolumeX, Play, Pause, Music } from 'lucide-react';

export const AudioBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    return audio.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
      setVolume(state.volume);
    });
  }, []);

  const handleTogglePlay = () => {
    audio.resume();
    audio.toggleMusic();
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    audio.resume();
    audio.toggleMute();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    audio.setVolume(val);
  };

  return (
    <div className="relative flex items-center gap-1.5 sm:gap-2">
      {/* Play / Pause Toggle Button */}
      <button
        onClick={handleTogglePlay}
        title={isPlaying ? 'Pause Piano & Flute Music' : 'Play Piano & Flute Music'}
        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/85 hover:bg-white border border-[#FFD6E7] shadow-xs text-xs font-semibold text-[#343B63] cursor-pointer transition-transform hover:scale-105 active:scale-95"
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 text-[#FF4081]" />
            <span className="hidden sm:inline text-[11px]">Music</span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 text-[#FF4081]" />
            <span className="hidden sm:inline text-[11px]">Play Melody</span>
          </>
        )}

        {/* Animated Sound Wave bars when music is playing */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-3.5 ml-0.5">
            <span className="w-1 bg-[#FF80AB] rounded-full animate-pulse" style={{ height: '70%' }} />
            <span className="w-1 bg-[#87CEEB] rounded-full animate-pulse" style={{ height: '100%', animationDelay: '0.2s' }} />
            <span className="w-1 bg-[#E8C77B] rounded-full animate-pulse" style={{ height: '50%', animationDelay: '0.4s' }} />
          </div>
        )}
      </button>

      {/* Mute / Unmute & Slider Trigger */}
      <div 
        className="relative flex items-center"
        onMouseEnter={() => setShowSlider(true)}
        onMouseLeave={() => setShowSlider(false)}
      >
        <button
          onClick={handleToggleMute}
          title={isMuted ? 'Unmute' : 'Mute'}
          className="p-1.5 rounded-full bg-white/85 hover:bg-white border border-[#FFD6E7] text-[#343B63] cursor-pointer shadow-xs"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-gray-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-[#FF4081]" />
          )}
        </button>

        {/* Hover Volume Slider */}
        {showSlider && (
          <div className="absolute top-full right-0 mt-2 p-2 px-3 rounded-2xl glass-card border border-[#FFD6E7] shadow-lg flex items-center gap-2 z-50">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-20 accent-[#FF4081] cursor-pointer"
            />
            <span className="text-[10px] font-mono text-[#343B63] w-6">
              {Math.round(volume * 100)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
