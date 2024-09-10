'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Lead } from '@/constants/data'; // Assuming 'User' contains contact details
import { CellAction } from './cell-action'; // Assuming CellAction is used for row actions
import { Calendar } from 'lucide-react';

// Assuming the User type matches the lead/contact structure
// Update User type definition accordingly if necessary

export const columns: ColumnDef<Lead>[] = [
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
        className={`rounded px-2 py-1 text-sm ${getStatusColor(
          row.original.status
        )}`}
        value={row.original.status}
        onChange={(e) => handleStatusChange(row.id, e.target.value)}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
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
    accessorKey: 'lastUpdate',
    header: 'Last Update',
    cell: ({ row }) => <span>{row.original.lastUpdate || 'Today'}</span>
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];

// Function to handle status change (can be moved into a component where state is maintained)
const handleStatusChange = (id: string, newValue: string) => {
  // Your logic to handle status change, e.g., updating state or making an API call
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

const getStatusColor = (status: string) => {
  const selectedStatus = statusOptions.find(
    (option) => option.value === status
  );
  return selectedStatus
    ? `${selectedStatus.bgColor} ${selectedStatus.textColor}`
    : '';
};
