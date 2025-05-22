import type React from "react";
import VoiceRecorderCore from "./VoiceRecorderCore";
import { scriptCloneTextDefault } from "@/constants/_faker/_api/eleven_labs/scripts";

const MIN_RECORDING_LENGTH = 60;
const MAX_RECORDING_LENGTH = 120;

interface CloneModalProps {
	open: boolean;
	onClose: () => void;
	onSave: (audioBlob: Blob) => void;
}

const CloneModal: React.FC<CloneModalProps> = ({ open, onClose, onSave }) => {
	return (
		<div>
			<VoiceRecorderCore
				open={open}
				onClose={onClose}
				onSave={onSave}
				minRecordingLength={MIN_RECORDING_LENGTH}
				maxRecordingLength={MAX_RECORDING_LENGTH}
				scriptText={scriptCloneTextDefault}
				showTeleprompter={true}
				modalTitle={"Clone Your Voice"}
				extraContent={
					<div className="mb-4 text-center font-medium text-blue-600 text-xs dark:text-blue-300">
						We recommend a recording length of "
						<span className="font-bold">1-2 minutes</span>.<br />
						More than 3 minutes won't necessarily improve the clone, and can
						even be destructive in some cases.
						<br />
						<span className="font-bold">Focus on quality!</span>
						<div className="mb-4 text-muted-foreground text-sm">
							<strong>Guidelines for best results:</strong>
							<ul className="mt-2 list-disc pl-5">
								Create an original, realistic voice by specifying age,
								accent/nationality, gender, tone, pitch, intonation, speed, and
								emotion.
								<li className="mt-2">
									<a
										href="https://elevenlabs.io/docs/product-guides/voices/voice-design"
										target="_blank"
										rel="noopener noreferrer"
										className="text-blue-600 hover:underline dark:text-blue-400"
									>
										Read full documentation
									</a>
								</li>
							</ul>
						</div>
					</div>
				}
			/>
		</div>
	);
};

export default CloneModal;
