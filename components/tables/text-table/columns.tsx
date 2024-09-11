import { ColumnDef } from '@tanstack/react-table';
import { TextMessageCampaign, TextMessage } from '@/types/goHighLevel/text';
import { EyeIcon } from 'lucide-react';

// Color statuses for the text message campaign
const statusColor: Record<TextMessageCampaign['status'], string> = {
  pending: 'bg-orange-100 text-orange-600',
  'in-progress': 'bg-blue-100 text-blue-600',
  completed: 'bg-green-100 text-green-600',
  failed: 'bg-red-100 text-red-600'
};

// Functional component for viewing an individual message
const ViewMessageButton = ({ messageId }: { messageId: string }) => {
  const messageUrl = `https://textprovider.com/view/${messageId}`;

  return (
    <a
      href={messageUrl}
      target="_blank"
      rel="noreferrer"
      className="p-2 text-blue-500"
    >
      <EyeIcon className="h-5 w-5" />
    </a>
  );
};

// Handle message selection to view the message
const handleMessageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const messageUrl = event.target.value;
  if (messageUrl) {
    window.open(messageUrl, '_blank', 'noopener,noreferrer'); // Open the message in a new tab
  }
};

// Columns for the text message campaign table
export const textMessageCampaignColumns: ColumnDef<TextMessageCampaign>[] = [
  {
    accessorKey: 'name',
    header: 'Campaign Name',
    cell: ({ row }) => <span className="text-left">{row.original.name}</span>
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
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => (
      <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
    )
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
    accessorKey: 'failedCount',
    header: 'Failed',
    cell: ({ row }) => <span>{row.original.failedCount}</span>
  },
  {
    accessorKey: 'totalMessages',
    header: 'Total Messages',
    cell: ({ row }) => <span>{row.original.totalMessages}</span>
  },
  {
    accessorKey: 'lastMessageSentAt',
    header: 'Last Message Sent',
    cell: ({ row }) => (
      <span>
        {new Date(row.original.lastMessageSentAt).toLocaleDateString()}
      </span>
    )
  },
  {
    accessorKey: 'messages',
    header: 'View Messages',
    cell: ({ row }) => (
      <div className="flex">
        <select
          className="max-w-[200px] truncate rounded-md border p-2" // Set max width and truncate long text
          onChange={handleMessageSelect}
          defaultValue="" // Set default value to an empty string
        >
          <option value="" disabled>
            View Message
          </option>
          {row.original.messages.map((message: TextMessage) => (
            <option
              key={message.id}
              value={`https://textprovider.com/view/${message.id}`}
            >
              {message.body?.slice(0, 30) || 'No Content'}...
            </option>
          ))}
        </select>
      </div>
    )
  }
];
