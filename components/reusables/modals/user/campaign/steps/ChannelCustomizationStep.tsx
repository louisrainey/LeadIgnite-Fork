import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLeadListStore } from "@/lib/stores/leadList";
import type { FC } from "react";
import { useState } from "react";

// * Step 2: Channel Customization
interface ChannelCustomizationStepProps {
	primaryChannel: string;
	phoneNumber?: string | null;
	email?: string | null;
	socialAccounts?: string[];
	onConnectAccount?: (platform: string) => void;
	onNext: () => void;
	onBack: () => void;
}

const ChannelCustomizationStep: FC<ChannelCustomizationStepProps> = ({
	primaryChannel,
	phoneNumber = null,
	email = null,
	socialAccounts = [],
	onConnectAccount,
	onNext,
	onBack,
}) => {
	const [inputPhoneNumber, setInputPhoneNumber] = useState<string>(
		phoneNumber || "",
	);
	const [phoneError, setPhoneError] = useState<string>("");
	const [campaignArea, setCampaignArea] = useState<string>("");
	const [areaError, setAreaError] = useState<string>("");
	const [selectedLeadListId, setSelectedLeadListId] = useState<string>("");
	const [leadListError, setLeadListError] = useState<string>("");
	const [areaMode, setAreaMode] = useState<"zip" | "leadList">("zip");
	const leadLists = useLeadListStore((state) => state.leadLists);
	const [textMessage, setTextMessage] = useState<string>("");
	const [textMessageError, setTextMessageError] = useState<string>("");

	// Only allow +1 and 10 digits after
	const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		if (!value.startsWith("+1")) {
			value = `+1${value.replace(/[^\d]/g, "")}`;
		} else {
			value = value.replace(/[^\d]/g, "");
			// biome-ignore lint/style/useTemplate: <explanation>
			value = "+1" + value.slice(1);
		}
		if (value.length > 12) value = value.slice(0, 12);
		setInputPhoneNumber(value);

		if (value.length !== 12) {
			setPhoneError("Phone number must be 10 digits after +1.");
		} else {
			setPhoneError("");
		}
	};

	const handleTextMessageChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const value = e.target.value;
		setTextMessage(value);
		if (value.trim().length === 0) {
			setTextMessageError("Message cannot be empty.");
		} else if (value.length > 300) {
			setTextMessageError("Message cannot exceed 300 characters.");
		} else {
			setTextMessageError("");
		}
	};

	const handleAreaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setCampaignArea(value);
		if (!value.trim()) {
			setAreaError("Campaign area is required.");
			return;
		}

		// Only allow US ZIP: 12345 or 12345-6789
		const zipRegex = /^\d{5}(-\d{4})?$/;
		if (zipRegex.test(value.trim())) {
			setAreaError("");
		} else {
			setAreaError("Enter a valid US zip code (e.g. 12345 or 12345-6789).");
		}
	};

	const handleLeadListChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedLeadListId(e.target.value);
		if (!e.target.value) {
			setLeadListError("Please select a lead list.");
		} else {
			setLeadListError("");
		}
	};

	const isPhoneValid = inputPhoneNumber.length === 12;
	const isZipValid = campaignArea.trim().length > 0 && areaError === "";
	const isLeadListValid = selectedLeadListId !== "";
	const isAreaSelectionValid =
		areaMode === "zip" ? isZipValid : isLeadListValid;
	const isTextValid =
		isPhoneValid && textMessage.trim().length > 0 && textMessage.length <= 300;

	return (
		<div>
			<h2 className="mb-4 font-semibold text-lg">
				Customize Channel:{" "}
				{primaryChannel.charAt(0).toUpperCase() + primaryChannel.slice(1)}
			</h2>
			{primaryChannel === "call" && (
				<div className="mb-4">
					<label htmlFor="callPhone" className="mb-1 block text-sm">
						Primary Phone Number
					</label>
					<Input
						id="callPhone"
						value={inputPhoneNumber}
						onChange={handlePhoneNumberChange}
						placeholder="Enter phone number"
						className="mb-2 w-full"
						type="text"
						maxLength={12}
					/>
					{phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}

					<div className="mb-4">
						<label
							htmlFor="areaMode"
							className="mb-1 block font-medium text-sm"
						>
							Choose Area Type
						</label>
						<div className="mb-2 flex gap-4">
							<label className="flex items-center gap-2">
								<input
									type="radio"
									checked={areaMode === "zip"}
									onChange={() => {
										setAreaMode("zip");
										setSelectedLeadListId("");
									}}
								/>
								<span>US Zip Code</span>
							</label>
							<label className="flex items-center gap-2">
								<input
									type="radio"
									checked={areaMode === "leadList"}
									onChange={() => {
										setAreaMode("leadList");
										setCampaignArea("");
										setAreaError("");
									}}
								/>
								<span>Lead List</span>
							</label>
						</div>
						{areaMode === "zip" && (
							<div>
								<label
									htmlFor="campaignAreaCall"
									className="mb-1 block text-sm"
								>
									Campaign Area (US Zip Code)
								</label>
								<Input
									id="campaignAreaCall"
									value={campaignArea}
									onChange={handleAreaChange}
									placeholder="Enter zip code , For more narrowed search use lead"
									className="mb-2 w-full"
									type="text"
									maxLength={64}
								/>
								{areaError && (
									<p className="text-red-500 text-xs">{areaError}</p>
								)}
							</div>
						)}
						{areaMode === "leadList" && (
							<div>
								<label
									htmlFor="leadListSelect"
									className="mb-1 block font-medium text-gray-700 text-sm dark:text-gray-300"
								>
									Lead List*
								</label>
								<div className="relative">
									<select
										id="leadListSelect"
										value={selectedLeadListId}
										onChange={handleLeadListChange}
										className={`w-full rounded border bg-background px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 ${
											leadListError
												? "border-red-400 focus:ring-red-500"
												: "border-gray-300"
										}`}
									>
										<option value="">-- Select a lead list --</option>
										{leadLists?.map((list) => (
											<option key={list.id} value={String(list.id)}>
												{list.listName}
											</option>
										))}
									</select>
									<span className="-translate-y-1/2 pointer-events-none absolute top-1/2 right-3 text-gray-400 dark:text-gray-500">
										<svg width="18" height="18" fill="none" viewBox="0 0 20 20">
											<path
												d="M6 8l4 4 4-4"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</span>
								</div>
								{leadListError && (
									<p className="mt-1 text-red-500 text-xs">{leadListError}</p>
								)}
							</div>
						)}
					</div>
				</div>
			)}
			{primaryChannel === "text" && (
				<div className="mb-4">
					<label htmlFor="textPhone" className="mb-1 block text-sm">
						Recipient Phone Number
					</label>
					<Input
						id="textPhone"
						value={inputPhoneNumber}
						onChange={handlePhoneNumberChange}
						placeholder="Enter recipient phone number"
						className="mb-2 w-full"
						type="text"
						maxLength={12}
					/>
					{phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}

					<label htmlFor="campaignAreaText" className="mb-1 block text-sm">
						Campaign Area (US Zip Code)
					</label>
					<Input
						id="campaignAreaText"
						value={campaignArea}
						onChange={handleAreaChange}
						placeholder="Enter zip code, city, or state"
						className="mb-2 w-full"
						type="text"
						maxLength={64}
					/>
					{areaError && <p className="text-red-500 text-xs">{areaError}</p>}
				</div>
			)}
			<div className="mt-8 flex justify-between gap-2">
				<Button onClick={onBack} variant="ghost" type="button">
					Back
				</Button>

				<Button
					onClick={onNext}
					type="button"
					disabled={
						(primaryChannel === "call" &&
							(!isPhoneValid || !isAreaSelectionValid)) ||
						(primaryChannel === "text" &&
							(!isPhoneValid || !isAreaSelectionValid))
					}
				>
					Next
				</Button>
			</div>
		</div>
	);
};

export default ChannelCustomizationStep;
