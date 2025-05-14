import { Checkbox } from "@/components/ui/checkbox";
import type {
	SocialAction,
	SocialMediaCampaign,
} from "@/types/_dashboard/campaign";
import type { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PlatformActionsDropdown from "../PlatformActionsDropdown";
import PlatformCell from "../PlatformCell";
import StatusCell from "../StatusCell";
import DownloadCell from "../DownloadCell";

// Color statuses for the social media campaign
// Color statuses for the social media campaign
export const statusColor: Record<
	| "pending"
	| "completed"
	| "failed"
	| "delivered"
	| "delivering"
	| "missed"
	| "queued"
	| "read"
	| "unread",
	string
> = {
	pending: "bg-orange-100 text-orange-600",
	completed: "bg-green-100 text-green-600",
	failed: "bg-red-100 text-red-600",
	delivered: "bg-blue-100 text-blue-600",
	delivering: "bg-yellow-100 text-yellow-600",
	missed: "bg-gray-100 text-gray-600",
	queued: "bg-purple-100 text-purple-600",
	read: "bg-indigo-100 text-indigo-600",
	unread: "bg-teal-100 text-teal-600",
};

// Define your types for row.original
interface RowOriginal {
	name: string;
	platform: string;
	senderHandle: string;
	startDate: string;
	endDate: string;
	status: string;
	actions: SocialAction[] | Record<string, SocialAction>; // Can be either an array or object
}

// Ensure the type string is cast properly for SocialAction
export function assertActionType(actionType: string): SocialAction["type"] {
	// A map to check valid action types for SocialAction
	const actionTypeMap: { [key: string]: SocialAction["type"] } = {
		Like: "Like",
		Follow: "Follow",
		Retweet: "Retweet",
		"📩 Followers": "📩 Followers",
		Connect: "Connect",
		"Connect & Follow Up": "Connect & Follow Up",
		Message: "Message",
		"Invite to Follow": "Invite to Follow",
		Comment: "Comment",
		"📩 Connections": "📩 Connections",
		"📩 Groups": "📩 Groups",
		"👁️ Story": "👁️ Story",
	};

	// Cast actionType to the correct SocialAction['type'] if it exists in the map
	if (actionTypeMap[actionType]) {
		return actionTypeMap[actionType];
	}

	throw new Error(`Invalid action type: ${actionType}`);
}
// Component for rendering actions in a dropdown per platform
export const PlatformActionsDropdown = ({
	actions,
}: {
	actions: SocialMediaCampaign["actions"];
}) => {
	const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

	// Extract available platforms from the actions
	const platforms = Array.from(
		new Set(
			actions.map((action) => {
				if (action.type.includes("📩")) return "LinkedIn";
				if (["Like", "Follow", "Retweet"].includes(action.type))
					return "Twitter";
				return "Instagram";
			}),
		),
	);

	// Get actions for the selected platform
	const filteredActions = selectedPlatform
		? actions.filter((action) => {
				if (selectedPlatform === "LinkedIn") return action.type.includes("📩");
				if (selectedPlatform === "Twitter")
					return ["Like", "Follow", "Retweet"].includes(action.type);
				return ["Like", "Follow", "Comment", "👁️ Story"].includes(action.type);
			})
		: [];

	return (
		<div className="relative">
			<select
				className="max-w-[150px] rounded-md border p-2" // Dropdown for selecting platform
				onChange={(e) => setSelectedPlatform(e.target.value)}
				defaultValue=""
			>
				<option value="" disabled>
					Select Platform
				</option>
				{platforms.map((platform) => (
					<option key={platform} value={platform}>
						{platform}
					</option>
				))}
			</select>

			{/* Display actions for the selected platform */}
			{selectedPlatform && (
				<ul className="mt-2 space-y-1">
					{filteredActions.map((action, index) => (
						<li key={index} className="flex justify-between">
							<div>
								{/* Action type with interaction counts */}
								<span>{action.type}</span>
								<span className="ml-2 text-gray-600 text-sm">
									(Attempts: {action.attempt}, Successes: {action.successful},
									Failures: {action.failed})
								</span>
							</div>
							<a
								href={action.viewLink}
								target="_blank"
								rel="noreferrer"
								className="text-blue-500 hover:underline"
							>
								View
							</a>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

// Columns for the social media campaign table
export const socialMediaCampaignColumns: ColumnDef<SocialMediaCampaign>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "name",
		header: "Campaign Name",
		cell: ({ row }) => <span className="text-left">{row.original.name}</span>,
	},
	{
		accessorKey: "platform",
		header: "Platform",
		cell: ({ row }) => (
			<PlatformCell actions={row.original.actions as SocialAction[]} />
		),
	},
	{
		accessorKey: "senderHandle",
		header: "Sender Handle",
		cell: ({ row }) => <span>{row.original.senderHandle}</span>,
	},
	{
		accessorKey: "startDate",
		header: "Start Date",
		cell: ({ row }) => (
			<span>{new Date(row.original.startDate).toLocaleDateString()}</span>
		),
	},
	{
		accessorKey: "endDate",
		header: "End Date",
		cell: ({ row }) => (
			<span>{new Date(row.original.endDate).toLocaleDateString()}</span>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => <StatusCell status={row.original.status} />,
	},

	{
		accessorKey: "download",
		header: "Download",
		cell: ({ row }: { row: { original: RowOriginal } }) => (
			<DownloadCell row={row} />
		),
	},
];
