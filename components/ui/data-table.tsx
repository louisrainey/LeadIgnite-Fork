import React, { useState } from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Input } from './input';
import { Button } from './button';
import { ScrollArea, ScrollBar } from './scroll-area';
import { Badge } from './badge'; // Assume a Badge component exists
import { Calendar, CheckCheck, MessageCircle } from 'lucide-react';
import ActivitySidebar from '../reusables/sidebars/activity';

// Status options
const statusOptions = [
  {
    value: 'new',
    label: 'New Lead',
    bgColor: 'bg-blue-600',
    textColor: 'text-white'
  },
  {
    value: 'contacted',
    label: 'Contacted',
    bgColor: 'bg-yellow-600',
    textColor: 'text-white'
  },
  {
    value: 'closed',
    label: 'Closed',
    bgColor: 'bg-green-600',
    textColor: 'text-white'
  },
  {
    value: 'lost',
    label: 'Lost',
    bgColor: 'bg-red-600',
    textColor: 'text-white'
  }
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}

export function LeadDataTable<TData, TValue>({
  columns,
  data,
  searchKey
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  // Handler for status dropdown changes
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false); // Manage sidebar open/close
  const [selectedLead, setSelectedLead] = useState<string | null>(null); // Track selected lead

  const handleStatusChange = (id: string, newValue: string) => {
    setStatuses((prev) => ({ ...prev, [id]: newValue }));
  };

  const getStatusColor = (status: string) => {
    const selectedStatus = statusOptions.find(
      (option) => option.value === status
    );
    return selectedStatus
      ? `${selectedStatus.bgColor} ${selectedStatus.textColor}`
      : '';
  };

  const openSidebar = (leadId: string) => {
    setSelectedLead(leadId);
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSelectedLead(null);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder={`Search ${searchKey}...`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-sm"
        />
        <Button variant="default" className="ml-4">
          <CheckCheck className="mr-2" />
          Create Lead
        </Button>
      </div>

      <ScrollArea className="h-[calc(80vh-220px)] rounded-md border md:h-[calc(80dvh-200px)]">
        <Table className="relative">
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="align-top">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                  <TableCell>
                    {/* Status dropdown with color coding */}
                    <select
                      className={`rounded px-2 py-1 text-sm ${getStatusColor(
                        statuses[row.id] || 'new'
                      )}`}
                      value={statuses[row.id] || 'new'}
                      onChange={(e) =>
                        handleStatusChange(row.id, e.target.value)
                      }
                    >
                      {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </TableCell>
                  <TableCell>
                    <Calendar className="mr-2 inline" />
                    None
                  </TableCell>
                  <TableCell>
                    <button onClick={() => openSidebar(row.id)}>
                      <MessageCircle className="inline" />
                    </button>
                  </TableCell>
                  <TableCell>Today</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
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

      {/* Conditionally render the ActivitySidebar */}
      {isSidebarOpen && <ActivitySidebar onClose={closeSidebar} />}
    </>
  );
}
