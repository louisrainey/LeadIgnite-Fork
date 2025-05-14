import { leadExcelColumns } from "@/components/tables/lead-tables/LeadColumns";
import { Button } from "@/components/ui/button";
import { exportLeadsTableDataToExcel } from "@/lib/_utils/files/downloadTableData";
import type { LeadTypeGlobal } from "@/types/_dashboard/leads";
import type { CellContext } from "@tanstack/react-table";

export function EmailDownloadCell({
	row,
}: CellContext<LeadTypeGlobal, unknown>) {
	return (
		<Button
			variant="outline"
			size="sm"
			onClick={() =>
				exportLeadsTableDataToExcel(
					"LeadsSheet", // sheetName
					leadExcelColumns, // columns
					[row.original], // data
					"LeadsExport", // filename
				)
			}
		>
			Export
		</Button>
	);
}
