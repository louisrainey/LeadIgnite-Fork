import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import type { FC } from "react";
import { useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

// * Step 3: Finalize Campaign
interface FinalizeCampaignStepProps {
	campaignName: string;
	setCampaignName: (name: string) => void;
	startDate: string;
	setStartDate: (date: string) => void;
	endDate: string;
	setEndDate: (date: string) => void;
	estimatedCredits: number;
	onLaunch: () => void;
	onBack: () => void;
}

const FinalizeCampaignStep: FC<FinalizeCampaignStepProps> = ({
	campaignName,
	setCampaignName,
	startDate,
	setStartDate,
	endDate,
	setEndDate,
	estimatedCredits,
	onLaunch,
	onBack,
}) => {
	const [campaignGoal, setCampaignGoal] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [goalError, setGoalError] = useState<string | null>(null);
	const [dateError, setDateError] = useState<string | null>(null);
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: startDate ? new Date(startDate) : undefined,
		to: endDate ? new Date(endDate) : undefined,
	});

	const handleCampaignNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const name = e.target.value;
		setCampaignName(name);

		if (name.length > 0) {
			if (
				name.length < 5 ||
				name.length > 30 ||
				!/^[A-Za-z0-9. ]+$/.test(name)
			) {
				setErrorMessage(
					"Campaign name must be between 5-30 characters and can only contain letters, numbers, spaces, and dots.",
				);
			} else {
				setErrorMessage(null);
			}
		} else {
			setErrorMessage(null);
		}
	};

	const handleCampaignGoalChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>,
	) => {
		const goal = e.target.value;
		setCampaignGoal(goal);

		if (goal.length < 10 || !goal.includes(".")) {
			setGoalError("Campaign goal must be at least one sentence.");
		} else if (goal.length > 300) {
			setGoalError(
				"Campaign goal cannot exceed two paragraphs (~300 characters).",
			);
		} else {
			setGoalError(null);
		}
	};

	const handleDateSelection = (range: DateRange | undefined) => {
		setDateRange(range);

		if (range?.from) {
			setStartDate(format(range.from, "yyyy-MM-dd"));
		}
		if (range?.to) {
			setEndDate(format(range.to, "yyyy-MM-dd"));
		} else {
			setEndDate("");
		}

		if (range?.from && range?.to && range.from > range.to) {
			setDateError("The end date cannot be before the start date.");
		} else {
			setDateError(null);
		}
	};

	const isNextEnabled =
		campaignName.length >= 5 &&
		!errorMessage &&
		!goalError &&
		!dateError &&
		startDate &&
		endDate &&
		campaignGoal.length > 0;

	return (
		<div className="mx-auto max-w-lg">
			<h2 className="mb-4 font-semibold text-lg dark:text-white">
				Finalize your campaign
			</h2>
			<label
				htmlFor="campaignName"
				className="mb-1 block text-sm dark:text-white"
			>
				Campaign Name
			</label>
			<Input
				value={campaignName}
				onChange={handleCampaignNameChange}
				placeholder="Enter campaign name"
				className="mb-4 w-full"
				maxLength={30}
			/>
			{errorMessage && <p className="text-red-500">{errorMessage}</p>}
			<label
				htmlFor="campaignGoal"
				className="mb-1 block text-sm dark:text-white"
			>
				Campaign Goal
			</label>
			<Textarea
				value={campaignGoal}
				onChange={handleCampaignGoalChange}
				placeholder="Enter your campaign goal (1 sentence min, 1-2 paragraphs max)"
				className="mb-4 w-full"
				rows={4}
				maxLength={300}
			/>
			{goalError && <p className="text-red-500">{goalError}</p>}
			<label
				htmlFor="dateRange"
				className="mb-1 block text-center font-bold text-sm dark:text-white"
			>
				Select Start Date And End Date
			</label>
			<div className="mb-4 w-full max-w-lg overflow-auto">
				<Calendar
					mode="range"
					selected={dateRange}
					onSelect={handleDateSelection}
					numberOfMonths={2}
					fromDate={new Date()}
				/>
			</div>
			{dateError && <p className="text-red-500">{dateError}</p>}
			<p className="mb-4 text-gray-500 text-sm dark:text-gray-400">
				This campaign will cost {estimatedCredits} credits.
			</p>
			<Button
				onClick={onLaunch}
				className="w-full"
				type="button"
				disabled={!isNextEnabled}
			>
				Launch Campaign
			</Button>
			<Button onClick={onBack} className="mt-2 w-full" type="button">
				Back
			</Button>
		</div>
	);
};

export default FinalizeCampaignStep;
