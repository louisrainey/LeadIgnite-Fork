import type { SavedSearch } from "@/types/userProfile";
import type React from "react";

interface SavedSearchModalProps {
	open: boolean;
	onClose: () => void;
	savedSearches: SavedSearch[];
	onDelete: (id: string) => void;
	onSelect: (search: SavedSearch) => void;
}

const SavedSearchModal: React.FC<SavedSearchModalProps> = ({
	open,
	onClose,
	savedSearches,
	onDelete,
	onSelect,
}) => {
	if (!open) return null;
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
			<div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
				<button
					type="button"
					className="absolute top-3 right-3 text-gray-500 hover:text-orange-600"
					onClick={onClose}
					aria-label="Close modal"
				>
					&times;
				</button>
				<h2 className="mb-4 font-bold text-lg">Saved Searches</h2>
				{savedSearches.length === 0 ? (
					<div className="py-8 text-center text-gray-400">
						No saved searches yet.
					</div>
				) : (
					<ul className="max-h-80 space-y-4 overflow-y-auto">
						{savedSearches.map((search) => (
							<li
								key={search.id}
								className="flex flex-col gap-2 rounded-lg border bg-gray-50 p-4 dark:bg-gray-800"
							>
								<div className="flex items-center justify-between">
									<span className="font-semibold text-gray-900 dark:text-white">
										{search.name}
									</span>
									<span className="text-gray-400 text-xs">
										{new Date(search.createdAt).toLocaleString()}
									</span>
								</div>
								<pre className="overflow-x-auto rounded bg-gray-100 p-2 text-gray-700 text-xs dark:bg-gray-900 dark:text-gray-200">
									{JSON.stringify(search.searchCriteria, null, 2)}
								</pre>
								<div className="flex justify-end gap-2">
									<button
										type="button"
										className="rounded bg-orange-600 px-3 py-1 text-white text-xs hover:bg-orange-700"
										onClick={() => onSelect(search)}
									>
										Select
									</button>
									<button
										type="button"
										className="rounded bg-gray-200 px-3 py-1 text-gray-800 text-xs hover:bg-red-500 hover:text-white"
										onClick={() => onDelete(search.id)}
									>
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};

export default SavedSearchModal;
