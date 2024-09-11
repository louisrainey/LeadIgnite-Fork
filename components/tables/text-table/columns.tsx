import { ColumnDef } from '@tanstack/react-table';
import { TextMessageCampaign, TextMessage } from '@/types/goHighLevel/text';
import { EyeIcon } from 'lucide-react';
import { exportCampaignMessagesToExcel } from '@/lib/utils/files/tableData';

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
    header: 'Download Messages',
    cell: ({ row }) => {
      // Define the columns for exporting messages with correct keyof TextMessage type
      const messageColumns: {
        header: string;
        accessorKey: keyof TextMessage;
      }[] = [
        { header: 'Message ID', accessorKey: 'id' },
        { header: 'Body', accessorKey: 'body' }, // Body column
        { header: 'Attachments', accessorKey: 'attachments' }, // Attachments column
        { header: 'Type', accessorKey: 'messageType' },
        { header: 'Status', accessorKey: 'status' },
        { header: 'Direction', accessorKey: 'direction' },
        { header: 'Date Added', accessorKey: 'dateAdded' }
      ];

      // Extract the messages from the campaign
      const messages = row.original.messages as TextMessage[];

      return (
        <div className="flex space-x-2">
          {/* Button to download the messages as an Excel file */}
          <button
            className="p-2 text-blue-500 hover:underline"
            onClick={() => {
              console.log('Messages data:', messages); // Log for debugging

              exportCampaignMessagesToExcel(
                `Messages_${row.original.name}`, // Sheet name based on campaign name
                messageColumns, // Columns for the Excel export
                messages, // Pass the messages array from the campaign
                `${row.original.name}_messages.xlsx` // Filename for the downloaded file
              );
            }}
          >
            Download Messages
          </button>
        </div>
      );
    }
  }
];
