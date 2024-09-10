import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import playAnimation from '@/public/lottie/playButton.json'; // Path to play button Lottie animation

interface PlayButtonProps {
  audioSrc: string; // URL or path to the audio file
}

export function PlayButton({ audioSrc }: PlayButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioSrc));
  const lottieRef = useRef<any>(null); // Ref for Lottie animation control

  // Toggle play/pause for the audio and animation
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      lottieRef.current?.pause(); // Pause the Lottie animation
    } else {
      audioRef.current.play();
      lottieRef.current?.play(); // Start the Lottie animation when playing
    }
    setIsPlaying(!isPlaying);
  };

  // Automatically set playing state to false when the audio ends
  useEffect(() => {
    const audio = audioRef.current;
    audio.onended = () => {
      setIsPlaying(false);
      lottieRef.current?.pause(); // Pause the Lottie animation when audio ends
    };
    return () => {
      audio.pause(); // Cleanup when the component unmounts
    };
  }, []);

  return (
    <div
      onClick={togglePlay}
      className={`relative flex cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-300 ${
        isPlaying ? 'bg-red-500/50' : 'bg-green-500'
      }`}
      style={{ height: '60px', width: '60px' }} // Adjust button size (smaller)
    >
      <Lottie
        animationData={playAnimation} // Play animation
        loop={true} // Loop continuously while playing
        autoplay={false} // Prevent auto-play, only start on click
        lottieRef={lottieRef} // Ref for Lottie control
        style={{ height: '40px', width: '40px' }} // Smaller Lottie size
      />
    </div>
  );
}
