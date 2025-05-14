import React from "react";
import { statusColor } from "./_depr/columns";

type StatusType =
	| "pending"
	| "completed"
	| "failed"
	| "delivered"
	| "delivering"
	| "missed"
	| "queued"
	| "read"
	| "unread";

export const StatusCell = ({ status }: { status: StatusType | string }) => {
	const colorClass =
		statusColor[
			(status as StatusType) in statusColor ? (status as StatusType) : "missed"
		] || "bg-gray-100 text-gray-600";
	return (
		<span
			className={`rounded-full px-2 py-1 font-medium text-sm ${colorClass}`}
		>
			{status}
		</span>
	);
};

export default StatusCell;
