"use client";

import PageContainer from "@/components/layout/page-container";
import LeadsComponent from "../../components/leadsSearch/_depr";

export default function Page() {
	return (
		<PageContainer scrollable={true}>
			<LeadsComponent />
		</PageContainer>
	);
}
