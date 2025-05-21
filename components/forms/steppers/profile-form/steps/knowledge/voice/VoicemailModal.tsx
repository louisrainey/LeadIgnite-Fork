import type React from "react";
import VoiceRecorderCore from "./VoiceRecorderCore";

interface VoicemailModalProps {
	open: boolean;
	onClose: () => void;
	onSave: (audioBlob: Blob) => void;
}

const MIN_RECORDING_LENGTH = 5;

const VoicemailModal: React.FC<VoicemailModalProps> = ({
	open,
	onClose,
	onSave,
}) => {
	return (
		<VoiceRecorderCore
			open={open}
			onClose={onClose}
			onSave={onSave}
			minRecordingLength={MIN_RECORDING_LENGTH}
			modalTitle={"Record Voicemail"}
			extraContent={
				<div className="mb-4 text-center font-medium text-blue-600 text-xs dark:text-blue-300">
					UI/UX recommends a recording length of{" "}
					<span className="font-bold">1-2 minutes</span>.<br />
					More than 3 minutes won't necessarily improve the clone, and can even
					be detrimental in some cases.
					<br />
					<span className="font-bold">Focus on quality!</span>
				</div>
			}
		/>
	);
};

export default VoicemailModal;
