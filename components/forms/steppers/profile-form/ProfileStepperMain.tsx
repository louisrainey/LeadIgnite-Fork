"use client";
import type { ProfileFormValues } from "@/types/zod/userSetup/profile-form-schema";
import type React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { OAuthMain } from "./steps/Oauth/OAuthMain";
import { BaseSetupMain } from "./steps/base/BaseSetupMain";
import { KnowledgeBaseMain } from "./steps/knowledge/KnowledgeBaseMain";
import { PersonalInformationFormMain } from "./steps/personal_information/PersonalInformationFormMain";
import type { AssistantVoice } from "@/types/vapiAi/api/assistant/create";
import { useState } from "react";

// * Step definitions: label and component for each step
const steps = [
	{ label: "Personal Info", component: PersonalInformationFormMain },
	{ label: "Base Setup", component: BaseSetupMain },
	{ label: "Knowledge Base", component: KnowledgeBaseMain },
	{ label: "OAuth", component: OAuthMain },
];

export const ProfileStepper: React.FC = () => {
	const [currentStep, setCurrentStep] = useState(0);
	const [stepError, setStepError] = useState<string | null>(null); // * Error message for validation
	const form = useForm<ProfileFormValues>({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			personalNum: "",
			companyName: "",
			companyLogo: undefined,
			outreachEmailAddress: "",
			companyAssets: [],
			selectedVoice: "",
			exampleSalesScript: "",
			exampleEmailBody: "",
			voicemailRecordingId: "",
			clonedVoiceId: "",
			meta: undefined,
			socialMediaCampaignAccounts: {
				oauthData: {},
				facebook: undefined,
				twitter: undefined,
				instagram: undefined,
				linkedIn: undefined,
			},
			socialMediatags: [],
			state: "",
			city: "",
		},
		mode: "onChange",
	});

	// * Stepper header UI
	// Only include required and rendered fields for each step
	const stepFields: (keyof ProfileFormValues)[][] = [
		["firstName", "lastName", "email", "personalNum", "state", "city"], // Step 0
		["companyName", "companyLogo", "outreachEmailAddress", "companyAssets"], // Step 1
		["selectedVoice", "exampleSalesScript", "exampleEmailBody"], // Step 2 (adjust if any are optional)
		[], // Step 3 (OAuth, add required fields if any)
	];

	const StepperHeader = () => {
		const initialDataPresent = Boolean(initialData);
		// Helper: check if all previous steps are valid
		const allPrevStepsValid = (idx: number) => {
			for (let i = 0; i < idx; i++) {
				if (
					!form.getFieldState(stepFields[i][0]).isTouched ||
					!form.formState.isValid
				) {
					return false;
				}
			}
			return true;
		};
		return (
			<div className="mb-8 flex items-center">
				{steps.map((step, idx) => {
					let isDisabled = false;
					if (!initialDataPresent) {
						// Disable future steps unless all previous steps are valid
						isDisabled = idx > currentStep && !allPrevStepsValid(idx);
					}
					return (
						<button
							key={step.label}
							type="button"
							className={`flex items-center ${idx === currentStep ? "font-bold text-blue-600" : "text-gray-400"} ${isDisabled ? "cursor-not-allowed opacity-40" : "cursor-pointer"}`}
							onClick={async () => {
								if (initialDataPresent) {
									setStepError(null);
									setCurrentStep(idx);
								} else {
									// Only allow navigation to previous or current step
									if (idx <= currentStep) {
										setStepError(null);
										setCurrentStep(idx);
									} else {
										// Only allow navigating forward if all previous steps are valid
										let allPrevValid = true;
										for (let i = 0; i < idx; i++) {
											const valid = await form.trigger(stepFields[i]);
											if (!valid) {
												allPrevValid = false;
												break;
											}
										}
										if (allPrevValid) {
											setStepError(null);
											setCurrentStep(idx);
										} else {
											setStepError(
												"Please complete all previous steps before proceeding.",
											);
										}
									}
								}
							}}
							disabled={isDisabled}
						>
							<div
								className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${idx === currentStep ? "border-blue-600" : "border-gray-300"}`}
							>
								{idx + 1}
							</div>
							<span className="ml-2">{step.label}</span>
							{idx < steps.length - 1 && (
								<div className="mx-4 h-1 w-8 bg-gray-200" />
							)}
						</button>
					);
				})}
			</div>
		);
	};

	// * Example props for KnowledgeBaseMain and OAuthMain (customize as needed)
	const voices: AssistantVoice[] = [];
	const handleVoiceSelect = (voiceId: string) => {};
	const handleScriptUpload = (scriptContent: string) => {};
	const handleEmailUpload = (emailContent: string) => {};
	const selectedScriptFileName = "";
	const selectedEmailFileName = "";
	const loading = false;
	const initialData = undefined;

	return (
		<FormProvider {...form}>
			<div className="flex flex-col gap-8 p-8">
				<h2 className="mb-4 font-bold text-xl">Profile Stepper</h2>
				<StepperHeader />
				{/* Render the current step's component with its props */}
				{currentStep === 0 && <PersonalInformationFormMain loading={loading} />}
				{currentStep === 1 && (
					<BaseSetupMain loading={loading} initialData={initialData} />
				)}
				{currentStep === 2 && (
					<KnowledgeBaseMain
						loading={loading}
						voices={voices}
						handleVoiceSelect={handleVoiceSelect}
						handleScriptUpload={handleScriptUpload}
						selectedScriptFileName={selectedScriptFileName}
						handleEmailUpload={handleEmailUpload}
						selectedEmailFileName={selectedEmailFileName}
						initialData={initialData}
					/>
				)}
				{currentStep === 3 && (
					<OAuthMain loading={loading} initialData={initialData} />
				)}
				<div className="mt-8 flex flex-col gap-2">
					{stepError && (
						<div className="text-red-500 text-sm mb-2">{stepError}</div>
					)}
					<div className="flex justify-between">
						<button
							type="button"
							className="rounded bg-gray-100 px-4 py-2 text-gray-700 disabled:opacity-50"
							disabled={currentStep === 0}
							onClick={() => {
								setStepError(null);
								setCurrentStep((s) => Math.max(0, s - 1));
							}}
						>
							Back
						</button>
						{/* --- Next button with strict step validation --- */}
						{(() => {
							const watchedFields = form.watch(stepFields[currentStep]);
							const isCurrentStepValid =
								stepFields[currentStep].length === 0 ||
								stepFields[currentStep].every((field, i) => {
									const value = watchedFields?.[i];
									return (
										value !== undefined &&
										value !== "" &&
										!form.getFieldState(field).error
									);
								});
							return (
								<button
									type="button"
									className="rounded bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
									disabled={
										currentStep === steps.length - 1 ||
										(!initialData && !isCurrentStepValid)
									}
									onClick={async () => {
										setStepError(null);
										const initialDataPresent = Boolean(initialData);
										if (!initialDataPresent) {
											const valid = await form.trigger(stepFields[currentStep]);
											if (!valid) {
												setStepError(
													"Please fill in all required fields for this step.",
												);
												return;
											}
										}
										setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
									}}
								>
									Next
								</button>
							);
						})()}
					</div>
				</div>
			</div>
		</FormProvider>
	);
};

export default ProfileStepper;
