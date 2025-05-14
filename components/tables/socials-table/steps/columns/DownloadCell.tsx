import React from "react";
import { exportSocialTableDataToExcel } from "@/lib/_utils/files/downloadTableData";
import type { SocialAction } from "@/types/_dashboard/campaign";

interface RowOriginal {
	name: string;
	platform: string;
	senderHandle: string;
	startDate: string;
	endDate: string;
	status: string;
	actions: SocialAction[] | Record<string, SocialAction>;
}

export const DownloadCell = ({ row }: { row: { original: RowOriginal } }) => {
	const handleDownload = () => {
		const columns = [
			{ header: "Campaign Name", accessorKey: "name" },
			{ header: "Platform", accessorKey: "platform" },
			{ header: "Sender Handle", accessorKey: "senderHandle" },
			{ header: "Start Date", accessorKey: "startDate" },
			{ header: "End Date", accessorKey: "endDate" },
			{ header: "Status", accessorKey: "status" },
			{ header: "Actions", accessorKey: "actions" },
		];
		const platforms = Array.from(
			new Set(
				(row.original.actions as SocialAction[]).map((action: SocialAction) => {
					if (action.type.includes("📩")) return "LinkedIn";
					if (["Like", "Follow", "Retweet"].includes(action.type))
						return "Twitter";
					return "Instagram";
				}),
			),
		);
		const filterActionsByPlatform = (platform: string) => {
			const actionsArray = row.original.actions as SocialAction[];
			return actionsArray.filter((action: SocialAction) => {
				if (platform === "LinkedIn") return action.type.includes("📩");
				if (platform === "Twitter")
					return ["Like", "Follow", "Retweet"].includes(action.type);
				return ["Like", "Follow", "Comment", "👁️ Story"].includes(action.type);
			});
		};
		const data = platforms.flatMap((platform: string) =>
			filterActionsByPlatform(platform).map((action: SocialAction) => ({
				name: row.original.name,
				platform,
				senderHandle: row.original.senderHandle,
				startDate: row.original.startDate,
				endDate: row.original.endDate,
				status: row.original.status,
				actions: `${action.type} (Attempts: ${action.attempt}, Successes: ${action.successful}, Failures: ${action.failed}, Status: ${action.status}, View: ${action.viewLink})`,
			})),
		);
		exportSocialTableDataToExcel(
			"Campaign Data",
			"social",
			columns,
			data,
			`${row.original.name}-campaign.xlsx`,
		);
	};
	return (
		<button
			type="button"
			className="text-blue-500 hover:underline"
			onClick={handleDownload}
		>
			Download Excel
		</button>
	);
};

export default DownloadCell;
