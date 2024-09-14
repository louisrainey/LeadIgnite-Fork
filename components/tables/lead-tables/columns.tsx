'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { LeadTypeGlobal } from '@/constants/data'; // Assuming 'Lead' contains contact details
import { CellAction } from './cell-action'; // Assuming CellAction is used for row actions
import { Calendar, MessageCircle } from 'lucide-react';
import { useState } from 'react';

// Assuming the Lead type matches the lead/contact structure

export const columns: ColumnDef<LeadTypeGlobal>[] = [
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
    accessorKey: 'name',
    header: 'Lead',
    cell: ({ row }) => (
      <div>
        <strong>
          {row.original.firstName} {row.original.lastName}
        </strong>
        <div className="text-sm text-muted-foreground">
          {row.original.address1}
        </div>
      </div>
    )
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => <span>{row.original.phone}</span>
  },
  {
    accessorKey: 'summary',
    header: 'Summary',
    cell: ({ row }) => <span>{row.original.summary}</span>
  },
  {
    accessorKey: 'bed',
    header: 'Bed',
    cell: ({ row }) => <span>{row.original.bed}</span>
  },
  {
    accessorKey: 'bath',
    header: 'Bath',
    cell: ({ row }) => <span>{row.original.bath}</span>
  },
  {
    accessorKey: 'sqft',
    header: 'SqFt',
    cell: ({ row }) => <span>{row.original.sqft}</span>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <select
        className={`rounded px-2 py-1 text-sm`}
        value={row.original.status}
        onChange={(e) =>
          handleStatusChange(row.original.id.toString(), e.target.value)
        }
      >
        {statusOptions.map((option) => (
          <option
            key={option.value}
            value={option.value}
            style={{
              backgroundColor: option.bgColor,
              color: option.textColor
            }}
          >
            {option.label}
          </option>
        ))}
      </select>
    )
  },
  {
    accessorKey: 'followUp',
    header: 'Follow Up',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Calendar className="mr-2" />
        {row.original.followUp ? row.original.followUp : 'None'}
      </div>
    )
  },
  {
    accessorKey: 'lastContactDate',
    header: 'Last Contact Date',
    cell: ({ row }) => (
      <div className="flex items-center">
        <Calendar className="mr-2" />
        {row.original.lastUpdate || 'Not Contacted'}
      </div>
    )
  },
  {
    accessorKey: 'actions',
    header: 'Activity',
    cell: ({ row }) => (
      <button
        className="text-center"
        onClick={() => openSidebar(row.original.id.toString())}
      >
        <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>
    )
  }
];

// Function to handle status change (can be moved into a component where state is maintained)
const handleStatusChange = (id: string, newValue: string) => {
  // Your logic to handle status change, e.g., updating state or making an API call
  console.log(`Status changed for Lead ID ${id} to ${newValue}`);
};

// Function to get status color (should match your dark mode colors)
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

// Sidebar logic
const openSidebar = (leadId: string) => {
  // Logic to open the sidebar for a given lead
  console.log(`Opening sidebar for Lead ID ${leadId}`);
};
