import { PlayButton } from '@/components/reusables/calls/playButton';
import { CallCampaign } from '@/types/_dashboard/campaign';
import { ColumnDef } from '@tanstack/react-table';

const statusColor: Record<CallCampaign['status'], string> = {
  delivering: 'bg-green-100 text-green-600',
  completed: 'bg-blue-100 text-blue-600',
  failed: 'bg-red-100 text-red-600',
  missed: 'bg-yellow-100 text-yellow-600',
  delivered: 'bg-teal-100 text-teal-600', // Example color for "delivered"
  pending: 'bg-orange-100 text-orange-600', // Example color for "pending"
  queued: 'bg-gray-100 text-gray-600', // Example color for "queued"
  read: 'bg-indigo-100 text-indigo-600', // Example color for "read"
  unread: 'bg-purple-100 text-purple-600' // Example color for "unread"
};

// Adjust the column structure to match the table design in the screenshot
export const callCampaignColumns: ColumnDef<CallCampaign>[] = [
  {
    accessorKey: 'name',
    header: 'Campaign Name',
    // Add `text-left` class to align the campaign name to the left
    cell: ({ row }) => <span className="text-left">{row.original.name}</span>
  },
  {
    accessorKey: 'calls',
    header: 'Calls',
    cell: ({ row }) => <span>{row.original.calls}</span>
  },
  {
    accessorKey: 'inQueue',
    header: 'In Queue',
    cell: ({ row }) => <span>{row.original.inQueue}</span>
  },
  {
    accessorKey: 'leads',
    header: 'Leads',
    cell: ({ row }) => <span>{row.original.leads}</span>
  },
  {
    accessorKey: 'voicemail',
    header: 'Voicemail',
    cell: ({ row }) => <span>{row.original.voicemail}</span>
  },
  {
    accessorKey: 'hungUp',
    header: 'Hung Up',
    cell: ({ row }) => <span>{row.original.hungUp}</span>
  },
  {
    accessorKey: 'dead',
    header: 'Dead',
    cell: ({ row }) => <span>{row.original.dead}</span>
  },
  {
    accessorKey: 'wrongNumber',
    header: 'Wrong #',
    cell: ({ row }) => <span>{row.original.wrongNumber}</span>
  },
  {
    accessorKey: 'inactiveNumber',
    header: 'Inactive #',
    cell: ({ row }) => <span>{row.original.inactiveNumber}</span>
  },
  {
    accessorKey: 'dnc',
    header: 'DNC',
    cell: ({ row }) => <span>{row.original.dnc}</span>
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      // Define different colors for each status

      // Fallback to a default color if status is not defined in statusColor
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
    accessorKey: 'callRecording',
    header: 'Playback',
    cell: ({ row }) => {
      const recordingUrl = row.original.vapi?.recordingUrl;
      return recordingUrl ? (
        <PlayButton audioSrc={recordingUrl} />
      ) : (
        'No Recording'
      );
    }
  }
];
