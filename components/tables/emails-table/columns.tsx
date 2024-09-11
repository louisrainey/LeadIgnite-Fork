// columns.tsx

import { ColumnDef } from '@tanstack/react-table';
import {
  EmailCampaign,
  GetEmailByIdResponse
} from '@/types/goHighLevel/conversations';
import { EyeIcon } from 'lucide-react';

// Color statuses for the email campaign
const statusColor: Record<EmailCampaign['status'], string> = {
  pending: 'bg-orange-100 text-orange-600',
  delivered: 'bg-green-100 text-green-600',
  delivering: 'bg-blue-100 text-blue-600',
  completed: 'bg-blue-100 text-blue-600',
  missed: 'bg-gray-100 text-gray-600',
  queued: 'bg-yellow-100 text-yellow-600',
  failed: 'bg-red-100 text-red-600',
  read: 'bg-indigo-100 text-indigo-600',
  unread: 'bg-purple-100 text-purple-600'
};

// Functional component for viewing an individual email via an external link
const ViewEmailButton = ({ emailId }: { emailId: string }) => {
  // Assuming that you construct the external email URL using the email ID
  const externalEmailUrl = `https://emailprovider.com/view/${emailId}`;

  return (
    <a
      href={externalEmailUrl}
      target="_blank"
      rel="noreferrer"
      className="p-2 text-blue-500"
    >
      <EyeIcon className="h-5 w-5" />
    </a>
  );
};

const handleEmailSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const emailUrl = event.target.value;
  if (emailUrl) {
    window.open(emailUrl, '_blank', 'noopener,noreferrer'); // Open the email in a new tab
  }
};
export const emailCampaignColumns: ColumnDef<EmailCampaign>[] = [
  {
    accessorKey: 'name',
    header: 'Campaign Name',
    cell: ({ row }) => <span className="text-left">{row.original.name}</span>
  },
  {
    accessorKey: 'senderEmail',
    header: 'Sender Email',
    cell: ({ row }) => <span>{row.original.senderEmail}</span>
  },
  {
    accessorKey: 'recipientCount',
    header: 'Recipients',
    cell: ({ row }) => <span>{row.original.recipientCount}</span>
  },
  {
    accessorKey: 'sentCount',
    header: 'Sent',
    cell: ({ row }) => <span>{row.original.sentCount}</span>
  },
  {
    accessorKey: 'deliveredCount',
    header: 'Delivered',
    cell: ({ row }) => <span>{row.original.deliveredCount}</span>
  },
  {
    accessorKey: 'openedCount',
    header: 'Opened',
    cell: ({ row }) => <span>{row.original.openedCount}</span>
  },
  {
    accessorKey: 'bouncedCount',
    header: 'Bounced',
    cell: ({ row }) => <span>{row.original.bouncedCount}</span>
  },
  {
    accessorKey: 'failedCount',
    header: 'Failed',
    cell: ({ row }) => <span>{row.original.failedCount}</span>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const colorClass =
        statusColor[row.original.status] || 'bg-gray-100 text-gray-600';
      return (
        <span
          className={`rounded-full px-2 py-1 text-sm font-medium ${colorClass}`}
        >
          {row.original.status}
        </span>
      );
    }
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => (
      <span>{new Date(row.original.startDate).toLocaleDateString()}</span>
    )
  },
  {
    accessorKey: 'emails',
    header: 'View Emails',
    cell: ({ row }) => (
      <div className="flex">
        <select
          className="max-w-[200px] truncate rounded-md border p-2" // Set max width and truncate long text
          onChange={handleEmailSelect}
          defaultValue="" // Set default value to an empty string
        >
          <option value="" disabled>
            View an Thread
          </option>
          {row.original.emails.map((email: GetEmailByIdResponse) => (
            <option key={email.id} value={`mailto:${email.from}`}>
              {email.subject || 'No Subject'}
            </option>
          ))}
        </select>
      </div>
    )
  }
];
