'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Download } from 'lucide-react';
import { LeadList } from '@/constants/dashboard/leadList'; // Assuming this is the correct path

// Columns configuration for LeadList
export const columns: ColumnDef<LeadList>[] = [
  {
    id: 'select',
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
    enableHiding: false
  },
  {
    accessorKey: 'listName',
    header: 'List',
    cell: ({ row }) => <span>{row.original.listName}</span>
  },
  {
    accessorKey: 'uploadDate',
    header: 'Upload Date',
    cell: ({ row }) => <span>{row.original.uploadDate}</span>
  },
  {
    accessorKey: 'records',
    header: 'Records',
    cell: ({ row }) => <span>{row.original.records}</span>
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => <span>{row.original.phone}</span>
  },
  {
    accessorKey: 'emails',
    header: 'Emails',
    cell: ({ row }) => <span>{row.original.emails}</span> // Added emails column
  },
  {
    accessorKey: 'socials',
    header: 'Socials',
    cell: ({ row }) => (
      <div className="flex flex-col space-y-1">
        <span>Facebook: {row.original.socials.facebook}</span>
        <span>LinkedIn: {row.original.socials.linkedin}</span>
        <span>Instagram: {row.original.socials.instagram}</span>
        <span>Twitter: {row.original.socials.twitter}</span>
      </div>
    ) // Added socials column
  },
  {
    accessorKey: 'dataLink',
    header: 'Action',
    cell: ({ row }) => (
      <a href={row.original.dataLink} target="_blank" rel="noopener noreferrer">
        <button className="rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-800">
          <Download className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </a>
    )
  }
];
