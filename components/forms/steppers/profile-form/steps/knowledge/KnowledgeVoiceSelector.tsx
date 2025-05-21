import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import type { AssistantVoice } from "@/types/vapiAi/api/assistant/create";
import { useFormContext } from "react-hook-form";
import type React from "react";
import type { ProfileFormValues } from "@/types/zod/userSetup/profile-form-schema";

interface KnowledgeVoiceSelectorProps {
	loading: boolean;
	voices: AssistantVoice[];
	handleVoiceSelect: (voiceId: string) => void;
}

export const KnowledgeVoiceSelector: React.FC<KnowledgeVoiceSelectorProps> = ({
	loading,
	voices,
	handleVoiceSelect,
}) => {
	const { control } = useFormContext<ProfileFormValues>();
	return (
		<FormField
			control={control}
			name="selectedVoice"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Select Voice (Optional)</FormLabel>
					<FormControl>
						<select
							disabled={loading}
							value={field.value ?? ""}
							onChange={(e) => {
								field.onChange(e.target.value);
								handleVoiceSelect(e.target.value);
							}}
							className="block w-full rounded border border-gray-300 bg-white px-3 py-2"
						>
							<option value="">Choose a voice...</option>
							{voices.map((voice) => (
								<option key={voice.voiceId} value={voice.voiceId}>
									{voice.voiceId}
								</option>
							))}
						</select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};
