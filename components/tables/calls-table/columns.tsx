import { PlayButtonSkip } from '@/components/reusables/calls/playButton';
import { CallCampaign } from '@/types/_dashboard/campaign';
import { GetCallResponse } from '@/types/vapiAi/api/calls/get';
import { ColumnDef } from '@tanstack/react-table';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

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

// Adjust the column structure to match the table design
export const callCampaignColumns: ColumnDef<CallCampaign>[] = [
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
    header: 'Campaign Name',
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
      if (row.original.vapi && row.original.vapi.length > 0) {
        return <PlaybackCell vapi={row.original.vapi} />;
      } else {
        return 'No Calls';
      }
    }
  }
];

interface PlaybackCellProps {
  vapi: GetCallResponse[];
}

export const PlaybackCell = ({ vapi }: PlaybackCellProps) => {
  const [currentCallIndex, setCurrentCallIndex] = useState(0);

  const handleNextCall = () => {
    if (currentCallIndex < vapi.length - 1) {
      setCurrentCallIndex(currentCallIndex + 1); // Move to the next call
    }
  };

  const handlePrevCall = () => {
    if (currentCallIndex > 0) {
      setCurrentCallIndex(currentCallIndex - 1); // Move to the previous call
    }
  };

  const currentCall = vapi[currentCallIndex]; // Access the current call
  const title = currentCall.id;
  const recordingUrl = currentCall.recordingUrl;
  const startedAt = currentCall.startedAt
    ? new Date(currentCall.startedAt).getTime() / 1000
    : 0;
  const endedAt = currentCall.endedAt
    ? new Date(currentCall.endedAt).getTime() / 1000
    : 0;

  if (recordingUrl) {
    return (
      <PlayButtonSkip
        title={title}
        audioSrc={recordingUrl}
        startTime={startedAt}
        endTime={endedAt}
        onNextCall={handleNextCall}
        onPrevCall={handlePrevCall}
        isNextDisabled={currentCallIndex >= vapi.length - 1}
        isPrevDisabled={currentCallIndex <= 0}
      />
    );
  } else {
    return <span>No Recording</span>;
  }
};
