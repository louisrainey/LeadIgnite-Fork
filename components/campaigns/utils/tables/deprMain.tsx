'use client';

import * as React from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  CallCampaign,
  EmailCampaign,
  SocialMediaCampaign
} from '@/types/_dashboard/campaign';
import { exampleCampaignsData } from '@/constants/data/campaigns';
import { emailColumns, callColumns, socialMediaColumns } from './utils/columns';

// Define a union type of all campaign types
type Campaign = SocialMediaCampaign | EmailCampaign | CallCampaign;

// Main DataTable Component
export function CampaignsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [campaignType, setCampaignType] = React.useState<
    'social' | 'email' | 'call'
  >('social');

  // Dynamically set selected data based on the campaign type
  const selectedData = React.useMemo(() => {
    switch (campaignType) {
      case 'email':
        return exampleCampaignsData.emails;
      case 'call':
        return exampleCampaignsData.calls;
      case 'social':
        return exampleCampaignsData.SocialCampaigns;
      default:
        return [];
    }
  }, [campaignType]);

  // Dynamically set columns based on the campaign type
  const selectedColumns = React.useMemo(() => {
    switch (campaignType) {
      case 'email':
        return emailColumns as ColumnDef<EmailCampaign>[]; // Type assertion here to make sure columns match the data
      case 'call':
        return callColumns as ColumnDef<CallCampaign>[]; // Type assertion for call campaigns
      case 'social':
        return socialMediaColumns as ColumnDef<SocialMediaCampaign>[]; // Type assertion for social campaigns
      default:
        return [];
    }
  }, [campaignType]);

  const table = useReactTable({
    data: selectedData, // Use the dynamic data
    columns: selectedColumns, // Use the dynamic columns
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: { sorting, rowSelection }
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter campaigns..."
          value={
            (table.getColumn('platform')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('platform')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={selectedColumns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
