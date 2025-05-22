import playAnimation from "@/public/lottie/playButton.json";
/// <reference types="react" />
import Lottie from "lottie-react";
import type { LottieRefCurrentProps } from "lottie-react";
import React, { useEffect, useRef, useState, useImperativeHandle } from "react";

interface PlayButtonTimeLineProps {
	audioSrc: string;
	startTime: number; // Optional start time in seconds
	endTime?: number; // Optional end time in seconds
}

import type { ForwardedRef } from "react";

export interface PlayButtonTimeLineHandle {
	play: () => void;
}

export const PlayButtonTimeLine = React.forwardRef<
	PlayButtonTimeLineHandle,
	PlayButtonTimeLineProps
>(
	(
		{ audioSrc, startTime = 0, endTime },
		ref: ForwardedRef<PlayButtonTimeLineHandle>,
	) => {
		const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for the audio element
		const [isPlaying, setIsPlaying] = useState(false);

		// Expose play() method to parent
		useImperativeHandle(ref, () => ({
			play: () => {
				console.log("[PlayButtonTimeLine] play() called", {
					audioRefCurrent: audioRef.current,
					startTime,
				});
				if (audioRef.current) {
					audioRef.current.currentTime = startTime;
					const playPromise = audioRef.current.play();
					lottieRef.current?.play?.();
					setIsPlaying(true);
					if (playPromise && typeof playPromise.catch === "function") {
						playPromise.catch((e) =>
							console.error("[PlayButtonTimeLine] audio.play() error", e),
						);
					}
				} else {
					console.warn(
						"[PlayButtonTimeLine] play() called but audioRef.current is null",
					);
				}
			},
			pause: () => {
				console.log("[PlayButtonTimeLine] pause() called", {
					audioRefCurrent: audioRef.current,
				});
				if (audioRef.current) {
					audioRef.current.pause();
					console.log("[PlayButtonTimeLine] audioRef.current.pause() called");
					lottieRef.current?.pause?.();
					setIsPlaying(false);
				} else {
					console.warn(
						"[PlayButtonTimeLine] pause() called but audioRef.current is null",
					);
				}
			},
		}));
		const [progress, setProgress] = useState(0); // Progress percentage (0 - 100)
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const [duration, setDuration] = useState(0); // Duration of the audio in seconds
		const lottieRef = useRef<LottieRefCurrentProps | null>(null); // Ref for Lottie animation control (typed)

		// Validate start and end times, ensuring positive values
		const validStartTime = Math.max(0, startTime); // Ensure startTime is at least 0
		const validEndTime = endTime && endTime > validStartTime ? endTime : null; // Ensure endTime is greater than startTime

		const togglePlay = () => {
			if (audioRef.current) {
				if (isPlaying) {
					audioRef.current.pause();
					console.log("[PlayButtonTimeLine] audioRef.current.pause() called");
					lottieRef.current?.pause?.();
					setIsPlaying(false);
					console.log("[PlayButtonTimeLine] togglePlay: paused");
				} else {
					const playPromise = audioRef.current.play();
					lottieRef.current?.play?.();
					setIsPlaying(true);
					console.log("[PlayButtonTimeLine] togglePlay: playing");
					if (playPromise && typeof playPromise.catch === "function") {
						playPromise.catch((e) =>
							console.error("[PlayButtonTimeLine] audio.play() error", e),
						);
					}
				}
			}
		};

		// Handle time update (called as audio plays)
		const handleTimeUpdate = () => {
			if (audioRef.current) {
				const currentTime = audioRef.current.currentTime;
				setProgress(
					(currentTime / (validEndTime || audioRef.current.duration)) * 100,
				); // Update progress as a percentage

				// Stop the audio if the endTime is reached
				if (validEndTime && currentTime >= validEndTime) {
					audioRef.current.pause();
					console.log("[PlayButtonTimeLine] audioRef.current.pause() called");
					audioRef.current.currentTime = validStartTime;
					setIsPlaying(false);
					// * Pause Lottie animation (type-safe)
					lottieRef.current?.pause?.(); // Pause animation
				}
			}
		};

		// Handle timeline change (when the user drags the slider)
		const handleTimelineChange = (
			event: React.ChangeEvent<HTMLInputElement>,
		) => {
			const newValue = Number(event.target.value);
			setProgress(newValue);
			if (audioRef.current) {
				const newTime =
					(newValue / 100) * (validEndTime || audioRef.current.duration);
				audioRef.current.currentTime = newTime; // Update audio current time
			}
		};

		// Load audio duration when metadata is available
		const handleLoadedMetadata = () => {
			if (audioRef.current) {
				setDuration(validEndTime || audioRef.current.duration); // Set to validEndTime or the full duration
				audioRef.current.currentTime = validStartTime; // Set the start time
			}
		};

		// Format time in MM:SS format
		// const formatTime = (seconds: number) => {
		//   const minutes = Math.floor(seconds / 60);
		//   const remainingSeconds = Math.floor(seconds % 60);
		//   return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
		// };

		useEffect(() => {
			if (audioRef.current) {
				// Set audio to start at `validStartTime` on load
				audioRef.current.currentTime = validStartTime;
			}
		}, [validStartTime]);

		return (
			<div className="flex items-center space-x-2">
				<div
					onClick={togglePlay}
					onKeyDown={(e) =>
						(e.key === "Enter" || e.key === " ") && togglePlay()
					}
					className={`relative flex cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-300 ${
						isPlaying ? "bg-red-500/50" : "bg-green-500"
					}`}
					style={{ height: "60px", width: "60px" }}
					tabIndex={0}
					role="button"
				>
					<Lottie
						animationData={playAnimation}
						loop={true}
						autoplay={false}
						lottieRef={lottieRef}
						style={{ height: "40px", width: "40px" }}
					/>
				</div>

				{/* Timeline Slider */}
				<input
					type="range"
					min="0"
					max="100"
					value={progress}
					onChange={handleTimelineChange}
					className="w-32"
				/>

				{/* Hidden audio element */}
				<audio
					ref={audioRef}
					src={audioSrc}
					preload="auto"
					style={{ width: 0, height: 0, visibility: "hidden" }}
					loop={false}
					onTimeUpdate={handleTimeUpdate}
					onLoadedMetadata={handleLoadedMetadata}
					onPlay={() => {
						console.log("[PlayButtonTimeLine] <audio> onPlay triggered");
						setIsPlaying(true);
						lottieRef.current?.play?.();
					}}
					onPause={() => {
						console.log("[PlayButtonTimeLine] <audio> onPause triggered");
						setIsPlaying(false);
						lottieRef.current?.pause?.();
					}}
					onError={(e) =>
						console.error("[PlayButtonTimeLine] <audio> onError", e)
					}
				>
					<track kind="captions" srcLang="en" label="English captions" />
				</audio>
			</div>
		);
	},
);
