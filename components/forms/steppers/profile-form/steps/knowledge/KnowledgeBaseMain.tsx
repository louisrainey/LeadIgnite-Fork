import type { AssistantVoice } from "@/types/vapiAi/api/assistant/create";

import type {
	ElevenLabsClient,
	GenerateSpeechRequest,
} from "@/types/elevenLabs/api/clone";
import type React from "react";
import { useEffect, useState } from "react";
import type { InitialKnowledgeBaseData } from "../../../utils/const/getKnowledgeBase";

import type { ProfileFormValues } from "@/types/zod/userSetup/profile-form-schema";
import type { UseFormReturn } from "react-hook-form";
import { KnowledgeEmailUpload } from "./KnowledgeEmailUpload";
import { KnowledgeSalesScriptUpload } from "./KnowledgeSalesScriptUpload";

import VoicemailModal from "./voice/VoicemailModal";

import { useFormContext } from "react-hook-form";
import { KnowledgeVoiceSelector } from "./KnowledgeVoiceSelector";
import CloneModal from "./voice/CloneModal";

export interface KnowledgeBaseMainProps {
	loading: boolean;
	voices: AssistantVoice[];
	handleVoiceSelect: (voiceId: string) => void;
	handleScriptUpload: (scriptContent: string) => void;
	selectedScriptFileName: string;
	handleEmailUpload: (emailContent: string) => void;
	selectedEmailFileName: string;
	initialData?: InitialKnowledgeBaseData;
}

export const KnowledgeBaseMain: React.FC<KnowledgeBaseMainProps> = ({
	loading,
	voices,
	handleVoiceSelect,
	handleScriptUpload,
	selectedScriptFileName,
	handleEmailUpload,
	selectedEmailFileName,
	initialData,
}) => {
	const form = useFormContext<ProfileFormValues>();
	const [showVoiceCloneModal, setShowVoiceCloneModal] = useState(false);
	const [showVoicemailModal, setShowVoicemailModal] = useState(false);

	useEffect(() => {
		if (initialData) {
			form.setValue("selectedVoice", initialData.selectedVoice || "");
			form.setValue("exampleSalesScript", initialData.exampleSalesScript || "");
			form.setValue("exampleEmailBody", initialData.exampleEmailBody || "");
			form.setValue(
				"voicemailRecordingId",
				initialData.voicemailRecordingId || "",
			);
			form.setValue("clonedVoiceId", initialData.clonedVoiceId || "");
		}
	}, [initialData, form]);

	const handleVoicemailRecording = (recordingId: string) => {
		form.setValue("voicemailRecordingId", recordingId);
		setShowVoicemailModal(false);
	};

	const handleVoiceCloneRecording = (recordingId: string) => {
		form.setValue("clonedVoiceId", recordingId);
		setShowVoiceCloneModal(false);
	};

	return (
		<>
			<KnowledgeVoiceSelector
				loading={loading}
				voices={voices}
				handleVoiceSelect={handleVoiceSelect}
			/>
			<KnowledgeSalesScriptUpload
				loading={loading}
				handleScriptUpload={handleScriptUpload}
				selectedScriptFileName={selectedScriptFileName}
			/>
			{/* Email Upload Section */}
			<div className="relative my-4 flex flex-col items-center justify-center gap-2">
				<label
					htmlFor="exampleEmailBody"
					className="mb-1 font-medium text-base text-gray-700 dark:text-gray-200"
				>
					Upload Email Body Content
				</label>
				<KnowledgeEmailUpload
					loading={loading}
					handleEmailUpload={handleEmailUpload}
					selectedEmailFileName={selectedEmailFileName}
					disabled={true} // ! Feature flag for coming soon
				/>
				{/* ! Overlay only if disabled/coming soon */}
			</div>

			{/* Action Buttons: Voicemail & Clone Voice */}
			<div className="my-6 flex flex-col items-center justify-center gap-4 md:flex-row">
				<button
					type="button"
					className="w-56 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
					onClick={() => setShowVoicemailModal(true)}
					aria-label="Record Voicemail"
				>
					+ Record Voicemail
				</button>
				<button
					type="button"
					className="w-56 rounded-lg bg-purple-600 px-4 py-2 font-semibold text-white shadow hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 dark:bg-purple-500 dark:hover:bg-purple-600"
					onClick={() => setShowVoiceCloneModal(true)}
					aria-label="Clone Voice"
				>
					+ Clone Voice
				</button>
			</div>
			{/* New Voicemail Modal with Lottie Animation */}
			<VoicemailModal
				open={showVoicemailModal}
				onClose={() => setShowVoicemailModal(false)}
				onSave={(audioBlob) => {
					// todo: handle upload or save logic
					// For now, just close the modal
					setShowVoicemailModal(false);
				}}
			/>
			{/* New Voice Clone Modal (advanced) */}
			{showVoiceCloneModal && (
				<CloneModal
					open={showVoiceCloneModal}
					onClose={() => setShowVoiceCloneModal(false)}
					onSave={(audioBlob) => {
						// todo: handle upload or save logic
						// For now, just close the modal
						setShowVoiceCloneModal(false);
					}}
				/>
			)}
		</>
	);
};
