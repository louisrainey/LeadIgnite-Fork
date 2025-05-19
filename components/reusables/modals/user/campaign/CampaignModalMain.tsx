import { useState } from "react";
import ChannelCustomizationStep from "./steps/ChannelCustomizationStep";
import ChannelSelectionStep from "./steps/ChannelSelectionStep";
import FinalizeCampaignStep from "./steps/FinalizeCampaignStep";
import {
	Dialog,
	DialogContent,
	DialogOverlay,
	DialogPortal,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";

// * Centralized Campaign Main Component
const allChannels = [
	"call",
	"text",
	"email",
	"twitter",
	"instagram",
	"linkedin",
];
const disabledChannels = ["email", "twitter", "instagram", "linkedin"];

const CampaignModalMain = () => {
	// * Modal open state
	const [open, setOpen] = useState(true);
	// * Centralized state for all steps
	const [step, setStep] = useState(0);
	const [primaryChannel, setPrimaryChannel] = useState("");
	const [campaignName, setCampaignName] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [estimatedCredits, setEstimatedCredits] = useState(0);

	// todo: Add more state for phone/email/social customization as needed

	// * Step navigation handlers
	const nextStep = () => setStep((s) => s + 1);
	const prevStep = () => setStep((s) => Math.max(0, s - 1));
	const closeModal = () => setOpen(false);
	const launchCampaign = () => {
		// todo: Implement campaign launch logic
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogPortal>
				<DialogOverlay className="fixed inset-0 z-50 bg-black/40" />
				<DialogContent className="-translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2 z-50 w-full max-w-xl rounded-lg bg-white p-6 shadow-lg focus:outline-none">
					<button
						onClick={closeModal}
						className="absolute top-4 right-4 rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
						aria-label="Close"
						type="button"
					>
						<X size={20} />
					</button>
					{step === 0 && (
						<ChannelSelectionStep
							primaryChannel={primaryChannel}
							setPrimaryChannel={setPrimaryChannel}
							onNext={nextStep}
							onClose={closeModal}
							allChannels={allChannels}
							disabledChannels={disabledChannels}
						/>
					)}
					{step === 1 && (
						<ChannelCustomizationStep
							primaryChannel={primaryChannel}
							// todo: Pass phone/email/social customization props
							onNext={nextStep}
							onBack={prevStep}
						/>
					)}
					{step === 2 && (
						<FinalizeCampaignStep
							campaignName={campaignName}
							setCampaignName={setCampaignName}
							startDate={startDate}
							setStartDate={setStartDate}
							endDate={endDate}
							setEndDate={setEndDate}
							estimatedCredits={estimatedCredits}
							onLaunch={launchCampaign}
							onBack={prevStep}
						/>
					)}
				</DialogContent>
			</DialogPortal>
		</Dialog>
	);
};

export default CampaignModalMain;
