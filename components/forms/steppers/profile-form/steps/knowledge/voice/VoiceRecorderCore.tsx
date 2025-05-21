import type React from "react";
import { useEffect, useRef, useState } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import VoiceClone from "@/public/lottie/RecordingButton.json";
import Teleprompter, { type TeleprompterHandle } from "./utils/Teleprompter";

interface VoiceRecorderCoreProps {
	open: boolean;
	onClose: () => void;
	onSave: (audioBlob: Blob) => void;
	minRecordingLength: number;
	maxRecordingLength: number; // ! Required max length in seconds
	scriptText?: string[];
	showTeleprompter?: boolean;
	modalTitle: React.ReactNode;
	extraContent?: React.ReactNode;
}

const VoiceRecorderCore: React.FC<VoiceRecorderCoreProps> = ({
	open,
	onClose,
	onSave,
	minRecordingLength,
	maxRecordingLength,
	scriptText,
	showTeleprompter = false,
	modalTitle,
	extraContent,
}) => {
	// * Teleprompter auto-scroll state
	const [teleprompterScrolling, setTeleprompterScrolling] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [recordingError, setRecordingError] = useState<string | null>(null);
	const [recordingDuration, setRecordingDuration] = useState<number>(0);
	const [maxLengthReached, setMaxLengthReached] = useState<boolean>(false);
	// * Indicates if a valid recording is available for finishing
	const [showFinishButton, setShowFinishButton] = useState(false);
	// * Holds the blob URL for playback
	const [audioUrl, setAudioUrl] = useState<string | null>(null);

	const lottieRef = useRef<LottieRefCurrentProps | null>(null);
	const mediaRecorderRef = useRef<MediaRecorder | null>(null);
	const audioChunksRef = useRef<Blob[]>([]);
	const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
	const teleprompterRef = useRef<TeleprompterHandle | null>(null);

	// Start/stop recording
	const handleRecordingToggle = async () => {
		if (isRecording) {
			stopRecording();
			setTeleprompterScrolling(false); // Stop auto-scroll when recording stops
		} else {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					audio: true,
				});
				startRecording(stream);
				setTeleprompterScrolling(true); // Start auto-scroll when recording starts
				lottieRef.current?.play();
			} catch {
				setRecordingError("Microphone access denied or unavailable.");
			}
		}
	};

	const startRecording = (stream: MediaStream) => {
		setIsRecording(true);
		setRecordingDuration(0);
		setRecordingError(null);
		setMaxLengthReached(false);
		audioChunksRef.current = [];
		const mediaRecorder = new MediaRecorder(stream);
		mediaRecorderRef.current = mediaRecorder;
		mediaRecorder.ondataavailable = (event) => {
			audioChunksRef.current.push(event.data);
		};
		mediaRecorder.start();
		recordingIntervalRef.current = setInterval(() => {
			setRecordingDuration((prev) => {
				if (prev + 1 >= maxRecordingLength) {
					setMaxLengthReached(true);
					stopRecording();
					return maxRecordingLength;
				}
				return prev + 1;
			});
		}, 1000);
	};

	const stopRecording = () => {
		const mediaRecorder = mediaRecorderRef.current;
		if (mediaRecorder && mediaRecorder.state === "recording") {
			mediaRecorder.stop();
			setIsRecording(false);
			if (recordingIntervalRef.current) {
				clearInterval(recordingIntervalRef.current);
				recordingIntervalRef.current = null;
			}
			lottieRef.current?.pause();
			mediaRecorder.onstop = () => {
				// After recording stops, allow user to preview and finish or re-record

				const audioBlob = new Blob(audioChunksRef.current, {
					type: "audio/wav",
				});
				if (recordingDuration >= minRecordingLength) {
					setRecordingError(null);
					// Clean up previous blob URL if any
					if (audioUrl) {
						URL.revokeObjectURL(audioUrl);
					}
					// * Set the new blob URL for playback (blob listening)
					const url = URL.createObjectURL(audioBlob);
					setAudioUrl(url);
					setShowFinishButton(true);
				} else {
					setRecordingError(
						`Recording too short. Please record at least ${minRecordingLength} seconds.`,
					);
					setShowFinishButton(false);
					if (audioUrl) {
						URL.revokeObjectURL(audioUrl);
						setAudioUrl(null);
					}
				}
			};
		}
	};

	// Pause Lottie at start
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (lottieRef.current) {
			lottieRef.current.goToAndStop(0, true);
		}
	}, [open]);

	// Clean up audio URL on modal close
	useEffect(() => {
		if (!open && audioUrl) {
			URL.revokeObjectURL(audioUrl);
			setAudioUrl(null);
		}
	}, [open, audioUrl]);

	// Finish/save
	const handleFinishRecording = () => {
		const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
		onSave(audioBlob);
		setShowFinishButton(false);
		setRecordingDuration(0);
		setMaxLengthReached(false);
		if (audioUrl) {
			URL.revokeObjectURL(audioUrl);
			setAudioUrl(null);
		}
	};

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
				{/* Close Button */}
				<button
					type="button"
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="currentColor"
						className="h-6 w-6"
						aria-hidden="true"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
				<h2 className="mb-2 text-center font-semibold text-gray-900 text-lg dark:text-gray-100">
					{modalTitle}
				</h2>
				{extraContent}
				<div className="mb-4 flex justify-center">
					{/* Lottie button */}
					<button
						type="button"
						onClick={handleRecordingToggle}
						className="outline-none focus:outline-none"
					>
						<Lottie
							lottieRef={lottieRef}
							animationData={VoiceClone}
							loop={true}
							autoplay={false}
						/>
					</button>
				</div>
				{/* Duration display */}
				<div className="mb-2 text-center text-gray-700 dark:text-gray-200">
					Duration: {recordingDuration}s / {maxRecordingLength}s
				</div>
				{maxLengthReached && (
					<p className="mb-2 text-center font-semibold text-orange-600 text-sm">
						! Maximum recording length reached. Recording stopped automatically.
					</p>
				)}
				{/* Teleprompter (optional) */}
				{showTeleprompter && scriptText && (
					<Teleprompter
						ref={teleprompterRef}
						scriptText={scriptText}
						isScrolling={teleprompterScrolling}
						onPauseChange={setTeleprompterScrolling}
						scrollSpeed={2000}
					/>
				)}
				{/* Blob listening: show preview and finish if a valid recording exists */}
				{audioUrl && showFinishButton && (
					<div className="mb-2 flex flex-col items-center">
						<audio src={audioUrl} controls className="w-full">
							<track kind="captions" label="English captions" srcLang="en" />
						</audio>
						<span className="mt-1 text-gray-500 text-xs">
							Preview your recording before saving.
						</span>
						{/* Re-record button: lets the user discard and try again */}
						<button
							type="button"
							onClick={() => {
								if (audioUrl) URL.revokeObjectURL(audioUrl);
								setAudioUrl(null);
								setShowFinishButton(false);
								setRecordingDuration(0);
								setRecordingError(null);
							}}
							className="mt-2 w-full rounded bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
						>
							Re-record
						</button>
					</div>
				)}
				{/* Start/Stop Recording Button: only show if not previewing a finished recording */}
				{!(audioUrl && showFinishButton) && (
					<button
						type="button"
						onClick={handleRecordingToggle}
						className={`mt-2 w-full rounded px-4 py-2 text-white ${
							isRecording
								? "bg-red-600 hover:bg-red-700"
								: "bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
						}`}
						disabled={!!audioUrl && !isRecording}
					>
						{isRecording ? "Stop Recording" : "Start Recording"}
					</button>
				)}
				{/* Finish Recording Button */}
				{showFinishButton && (
					<button
						type="button"
						onClick={handleFinishRecording}
						className="mt-4 w-full rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
					>
						Finish Recording
					</button>
				)}
				{/* Error message for microphone access or short recording */}
				{recordingError && (
					<p className="mt-2 text-center text-red-500 text-sm">
						{recordingError}
					</p>
				)}
			</div>
		</div>
	);
};

export default VoiceRecorderCore;
