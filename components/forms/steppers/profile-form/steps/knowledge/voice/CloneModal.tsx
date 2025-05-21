import type React from "react";
import VoiceRecorderCore from "./VoiceRecorderCore";

const MIN_RECORDING_LENGTH = 60;
const MAX_RECORDING_LENGTH = 120;

const scriptText = [
	"This is the first line of the script.",
	"Here is the second line.",
	"You are reading the third line.",
	"Keep going, you're almost done!",
	"This is the final line. Great job!",
];

interface CloneModalProps {
	open: boolean;
	onClose: () => void;
	onSave: (audioBlob: Blob) => void;
}

const CloneModal: React.FC<CloneModalProps> = ({ open, onClose, onSave }) => {
	return (
		<VoiceRecorderCore
			open={open}
			onClose={onClose}
			onSave={onSave}
			minRecordingLength={MIN_RECORDING_LENGTH}
			maxRecordingLength={MAX_RECORDING_LENGTH}
			scriptText={scriptText}
			showTeleprompter={true}
			modalTitle={"Clone Your Voice"}
		/>
	);
};

export default CloneModal;
