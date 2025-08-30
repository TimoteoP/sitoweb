'use client';

import { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
  title: string;
}

export default function AudioPlayer({ src, title }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', () => setIsPlaying(false));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-2xl p-6 mb-8 border border-gray-200">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      <div className="flex items-center gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-orange-500 text-white hover:from-blue-600 hover:to-orange-600 transition-all transform hover:scale-105"
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <div className="flex-1">
          {/* Title */}
          <div className="font-medium text-gray-900 mb-2 flex items-center gap-2">
            🎧 Ascolta l&apos;articolo: {title}
          </div>

          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 w-12">
              {formatTime(currentTime)}
            </span>
            
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #2563eb 0%, #2563eb ${
                  duration ? (currentTime / duration) * 100 : 0
                }%, #e5e7eb ${
                  duration ? (currentTime / duration) * 100 : 0
                }%, #e5e7eb 100%)`
              }}
            />
            
            <span className="text-sm text-gray-600 w-12">
              {formatTime(duration)}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-3 text-center">
        💡 Perfetto per chi preferisce ascoltare mentre lavora o è in movimento
      </p>
    </div>
  );
}