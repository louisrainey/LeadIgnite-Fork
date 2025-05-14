"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import type { ColumnDef } from "@tanstack/react-table";
import {
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { EmployeeTableBody } from "./steps/EmployeeTableBody";
import { EmployeeTableFilters } from "./steps/EmployeeTableFilters";
import { EmployeeTablePagination } from "./steps/EmployeeTablePagination";
import { useEmployeeTablePagination } from "./steps/useEmployeeTablePagination";

interface EmployeeTablesProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	searchKey: string;
	pageCount: number;
	pageSizeOptions?: number[];
}

export function EmployeeTables<TData, TValue>({
	columns,
	data,
	searchKey,
	pageCount,
	pageSizeOptions = [10, 20, 30, 40, 50],
}: EmployeeTablesProps<TData, TValue>) {
	// Use custom pagination/search hook
	const {
		router,
		pathname,
		searchParams,
		createQueryString,
		pagination,
		setPagination,
	} = useEmployeeTablePagination();

	const { pageIndex, pageSize } = pagination;

	const table = useReactTable({
		data,
		columns,
		pageCount: pageCount ?? -1,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			pagination: { pageIndex, pageSize },
		},
		onPaginationChange: setPagination,
		getPaginationRowModel: getPaginationRowModel(),
		manualPagination: true,
		manualFiltering: true,
	});

	const searchValue = table.getColumn(searchKey)?.getFilterValue() as string;

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	React.useEffect(() => {
		if (searchValue?.length > 0) {
			router.push(
				`${pathname}?${createQueryString({
					page: null,
					limit: null,
					search: searchValue,
				})}`,
				{ scroll: false },
			);
		}
		if (searchValue?.length === 0 || searchValue === undefined) {
			router.push(
				`${pathname}?${createQueryString({
					page: null,
					limit: null,
					search: null,
				})}`,
				{ scroll: false },
			);
		}
		setPagination((prev) => ({ ...prev, pageIndex: 0 }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return (
		<>
			{/* Filter/Search UI */}
			<EmployeeTableFilters
				searchKey={searchKey}
				searchValue={searchValue ?? ""}
				onChange={(value) => table.getColumn(searchKey)?.setFilterValue(value)}
			/>
			<ScrollArea className="h-[calc(80vh-220px)] rounded-md border">
				<EmployeeTableBody table={table} columnsLength={columns.length} />
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
			<div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
				<div className="flex w-full items-center justify-between">
					<div className="flex-1 text-muted-foreground text-sm">
						{table.getFilteredSelectedRowModel().rows.length} of{" "}
						{table.getFilteredRowModel().rows.length} row(s) selected.
					</div>
				</div>
				<EmployeeTablePagination
					pageIndex={table.getState().pagination.pageIndex}
					pageCount={table.getPageCount()}
					pageSize={table.getState().pagination.pageSize}
					pageSizeOptions={pageSizeOptions}
					canPreviousPage={table.getCanPreviousPage()}
					canNextPage={table.getCanNextPage()}
					setPageIndex={table.setPageIndex}
					setPageSize={table.setPageSize}
				/>
			</div>
		</>
	);
}
