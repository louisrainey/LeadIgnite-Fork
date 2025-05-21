import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { MapFormSchemaType } from "@/types/_dashboard/maps";
import { useEffect, useState } from "react";
import SavedSearchModal from "@/components/reusables/modals/SavedSearchModal";
import type { SavedSearch } from "@/types/userProfile";
import { Save, Sliders } from "lucide-react";
import type { Control, FieldErrors } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";

interface LeadSearchFormProps {
	control: Control<MapFormSchemaType>;
	errors: FieldErrors<MapFormSchemaType>;
	onAdvancedOpen: () => void;
}

// todo: Move to utils
function loadSavedSearches(): SavedSearch[] {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem("lead_saved_searches");
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function saveSavedSearches(s: SavedSearch[]) {
	if (typeof window === "undefined") return;
	localStorage.setItem("lead_saved_searches", JSON.stringify(s));
}

const LeadSearchForm: React.FC<LeadSearchFormProps> = ({
	control,
	errors,
	onAdvancedOpen,
}) => {
	const [saveModalOpen, setSaveModalOpen] = useState(false);
	const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

	useEffect(() => {
		setSavedSearches(loadSavedSearches());
	}, []);

	const handleSaveSearch = () => {
		const name = prompt("Name this search:");
		if (!name) return;
		const values = (control as any)._formValues || {};
		const newSearch: SavedSearch = {
			id: Date.now().toString(),
			name,
			createdAt: new Date(),
			searchCriteria: values,
			updatedAt: new Date(),
			priority: false,
		};
		const next = [newSearch, ...savedSearches];
		setSavedSearches(next);
		saveSavedSearches(next);
		setSaveModalOpen(true);
	};

	const handleDeleteSearch = (id: string) => {
		const next = savedSearches.filter((s) => s.id !== id);
		setSavedSearches(next);
		saveSavedSearches(next);
	};

	const handleSelectSearch = (search: SavedSearch) => {
		// todo: Actually apply these values to the form
		console.log("Apply saved search:", search);
		setSaveModalOpen(false);
	};

	return (
		<div className="mb-6 w-full rounded-xl bg-white/80 p-4 shadow-md dark:bg-gray-900/80">
			<div className="grid grid-cols-1 gap-x-6 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
				{/* Location */}
				<Controller
					name="location"
					control={control}
					render={({ field }) => (
						<div className="flex flex-col">
							<Label htmlFor="location" className="mb-2">
								Location*
							</Label>
							<Input
								id="location"
								placeholder="Enter a city, address, or zip code"
								type="text"
								error={errors.location?.message as string}
								{...field}
								className="w-full"
							/>
						</div>
					)}
				/>
				{/* Market Status */}
				<Controller
					name="marketStatus"
					control={control}
					render={({ field }) => (
						<div className="flex flex-col">
							<Label htmlFor="marketStatus" className="mb-2">
								Market Status
							</Label>
							<Select onValueChange={field.onChange} value={field.value || ""}>
								<SelectTrigger id="marketStatus">
									<SelectValue placeholder="Select status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="for_sale">For Sale</SelectItem>
									<SelectItem value="pending">Pending</SelectItem>
									<SelectItem value="sold">Sold</SelectItem>
								</SelectContent>
							</Select>
						</div>
					)}
				/>
				{/* Beds */}
				<Controller
					name="beds"
					control={control}
					render={({ field }) => (
						<div className="flex flex-col">
							<Label htmlFor="beds" className="mb-2">
								Beds
							</Label>
							<Input
								id="beds"
								placeholder="Beds"
								type="number"
								min={0}
								{...field}
								className="w-full"
							/>
						</div>
					)}
				/>
				{/* Baths */}
				<Controller
					name="baths"
					control={control}
					render={({ field }) => (
						<div className="flex flex-col">
							<Label htmlFor="baths" className="mb-2">
								Baths
							</Label>
							<Input
								id="baths"
								placeholder="Baths"
								type="number"
								min={0}
								{...field}
								className="w-full"
							/>
						</div>
					)}
				/>
				{/* Property Type */}
				<Controller
					name="propertyType"
					control={control}
					render={({ field }) => (
						<div className="flex flex-col">
							<Label htmlFor="propertyType" className="mb-2">
								Property Type
							</Label>
							<Select onValueChange={field.onChange} value={field.value || ""}>
								<SelectTrigger id="propertyType">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="single_family">Single Family</SelectItem>
									<SelectItem value="multi_family">Multi Family</SelectItem>
									<SelectItem value="condo">Condo</SelectItem>
									<SelectItem value="townhouse">Townhouse</SelectItem>
								</SelectContent>
							</Select>
						</div>
					)}
				/>
				<button
					type="button"
					className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 text-sm shadow-sm transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
					onClick={onAdvancedOpen}
				>
					<Sliders size={18} />
					Advanced
				</button>
			</div>
			{/* Action Buttons Below Form Fields */}
			<div className="mt-6 flex w-full flex-row flex-wrap items-center justify-center gap-3">
				<button
					type="button"
					className="flex items-center gap-2 rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 text-sm shadow-sm transition hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
					onClick={() => setSaveModalOpen(true)}
				>
					<Save size={18} />
					Saved Searches
				</button>
				<button
					type="button"
					className="flex items-center gap-2 rounded bg-orange-600 px-4 py-2 font-medium text-sm text-white shadow-sm transition hover:bg-orange-700 dark:bg-orange-700 dark:text-white dark:hover:bg-orange-800"
					onClick={handleSaveSearch}
				>
					<Save size={18} />
					Quick Save
				</button>
				<SavedSearchModal
					open={saveModalOpen}
					onClose={() => setSaveModalOpen(false)}
					savedSearches={savedSearches}
					onDelete={handleDeleteSearch}
					onSelect={handleSelectSearch}
				/>
			</div>
		</div>
	);
};

export default LeadSearchForm;
