import React from "react";
import type { SocialAction } from "@/types/_dashboard/campaign";

export const PlatformCell = ({ actions }: { actions: SocialAction[] }) => {
	const uniquePlatforms = Array.from(
		new Set(
			actions.map((action) => {
				if (action.type.includes("📩")) return "LinkedIn";
				if (["Like", "Follow", "Retweet"].includes(action.type))
					return "Twitter";
				return "Instagram";
			}),
		),
	);
	return <span>{uniquePlatforms.join(", ")}</span>;
};

export default PlatformCell;
