import React, {
	useRef,
	useEffect,
	useImperativeHandle,
	forwardRef,
} from "react";
import { uuid } from "uuidv4"; // * For unique keys

/**
 * TeleprompterProps defines the interface for the Teleprompter component.
 * @param scriptText - Array of strings to display as lines.
 * @param isScrolling - Boolean to control if auto-scroll is active.
 * @param scrollSpeed - Number of ms between scroll steps (default: 2000ms).
 * @param className - Optional className for styling.
 */
export interface TeleprompterProps {
	scriptText: string[];
	isScrolling: boolean;
	scrollSpeed?: number;
	className?: string;
	paused?: boolean;
	onPauseChange?: (paused: boolean) => void;
}

/**
 * TeleprompterHandle allows parent components to control scroll (optional).
 */
export interface TeleprompterHandle {
	scrollToTop: () => void;
	scrollToBottom: () => void;
}

/**
 * Teleprompter: A scrollable, auto-advancing transcript component for voice modals.
 * Usage: <Teleprompter ref={ref} scriptText={...} isScrolling={...} scrollSpeed={...} />
 */
const Teleprompter = forwardRef<TeleprompterHandle, TeleprompterProps>(
	(
		{
			scriptText,
			isScrolling,
			scrollSpeed = 2000,
			className = "",
			onPauseChange,
		},
		ref,
	) => {
		const containerRef = useRef<HTMLDivElement>(null);
		const intervalRef = useRef<NodeJS.Timeout | null>(null);

		// Expose scroll controls to parent
		useImperativeHandle(ref, () => ({
			scrollToTop: () => {
				if (containerRef.current) {
					containerRef.current.scrollTop = 0;
				}
			},
			scrollToBottom: () => {
				const c = containerRef.current;
				if (c) c.scrollTop = c.scrollHeight;
			},
		}));

		useEffect(() => {
			if (isScrolling) {
				let index = 0;
				if (containerRef.current) containerRef.current.scrollTop = 0;
				if (intervalRef.current) clearInterval(intervalRef.current);
				intervalRef.current = setInterval(() => {
					const container = containerRef.current;
					if (container && index < scriptText.length) {
						container.scrollTop += 20;
						index++;
					} else {
						if (intervalRef.current) clearInterval(intervalRef.current);
					}
				}, scrollSpeed);
			} else {
				if (intervalRef.current) clearInterval(intervalRef.current);
			}
			return () => {
				if (intervalRef.current) clearInterval(intervalRef.current);
			};
		}, [isScrolling, scriptText, scrollSpeed]);

		return (
			<div className="relative">
				{/* Floating Start/Stop Auto-Scroll button, never covers text */}
				<button
					type="button"
					className="-top-3 absolute right-0 z-10 rounded bg-blue-500 px-3 py-1 font-semibold text-white text-xs shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					style={{ transform: "translateY(-100%)" }}
					onClick={() => onPauseChange?.(!isScrolling)}
					aria-label={isScrolling ? "Stop Auto-Scroll" : "Start Auto-Scroll"}
				>
					{isScrolling ? "Stop Auto-Scroll" : "Start Auto-Scroll"}
				</button>
				<div
					ref={containerRef}
					className={`h-32 max-h-32 w-full overflow-y-auto border p-2 dark:border-gray-600 ${className}`}
					aria-label="Teleprompter transcript"
				>
					{scriptText.map((line, idx) => (
						<p key={uuid()} className="text-gray-700 dark:text-gray-300">
							{line}
						</p>
					))}
				</div>
			</div>
		);
	},
);

export default Teleprompter;
