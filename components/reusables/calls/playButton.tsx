import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import playAnimation from '@/public/lottie/playButton.json';

interface PlayButtonSkipProps {
  audioSrc: string;
  startTime: number;
  endTime: number;
  onNextCall: () => void; // Function to get the next call
  onPrevCall: () => void; // Function to get the previous call
  isNextDisabled: boolean; // To disable the Next button if no more calls
  isPrevDisabled: boolean; // To disable the Prev button if no more calls
}

export function PlayButtonSkip({
  audioSrc,
  startTime,
  endTime,
  onNextCall,
  onPrevCall,
  isNextDisabled,
  isPrevDisabled
}: PlayButtonSkipProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lottieRef = useRef<any>(null); // Ref for Lottie animation control

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        lottieRef.current?.pause();
      } else {
        audioRef.current.play();
        lottieRef.current?.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = startTime;
    }
  }, [startTime]);

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onPrevCall}
        disabled={isPrevDisabled}
        className={`p-2 ${
          isPrevDisabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        ⏮ Prev
      </button>

      <div
        onClick={togglePlay}
        className={`relative flex cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-300 ${
          isPlaying ? 'bg-red-500/50' : 'bg-green-500'
        }`}
        style={{ height: '60px', width: '60px' }}
      >
        <Lottie
          animationData={playAnimation}
          loop={true}
          autoplay={false}
          lottieRef={lottieRef}
          style={{ height: '40px', width: '40px' }}
        />
      </div>

      <button
        onClick={onNextCall}
        disabled={isNextDisabled}
        className={`p-2 ${
          isNextDisabled ? 'cursor-not-allowed opacity-50' : ''
        }`}
      >
        ⏭ Next
      </button>

      <audio ref={audioRef} src={audioSrc} />
    </div>
  );
}
