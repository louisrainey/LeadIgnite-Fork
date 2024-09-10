'use client';

import React, { useState } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { PlayButton } from '@/components/reusables/calls/playButton'; // Assuming the PlayButton exists
import { GetCallResponse } from '@/types/vapiAi/api/calls/get';
import { ConversationMessage } from '@/types/vapiAi/api/calls/create';

// Helper function to truncate text
const truncateText = (text: string, limit: number) => {
  if (text.length <= limit) return text;
  return text.slice(0, limit) + '...';
};

// Transcript cell component to manage expanded/collapsed state
const TranscriptCell = ({ transcript }: { transcript: string }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div>
      {expanded ? transcript : truncateText(transcript, 100)}
      {transcript.length > 100 && (
        <button onClick={toggleExpand} className="ml-2 text-blue-500">
          {expanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
};

// Define the columns based on GetCallResponse
export const callResponseColumns: ColumnDef<GetCallResponse>[] = [
  {
    accessorKey: 'id',
    header: 'Call ID'
  },
  {
    accessorKey: 'type',
    header: 'Call Type',
    cell: ({ row }) => row.original.type
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => row.original.status
  },
  {
    accessorKey: 'phoneCallProvider',
    header: 'Provider',
    cell: ({ row }) => row.original.phoneCallProvider
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleString()
  },
  {
    accessorKey: 'endedAt',
    header: 'Ended At',
    cell: ({ row }) =>
      row.original.endedAt
        ? new Date(row.original.endedAt).toLocaleString()
        : 'N/A'
  },
  {
    accessorKey: 'costBreakdown.total',
    header: 'Total Cost',
    cell: ({ row }) => `$${row.original.costBreakdown.total.toFixed(2)}`
  },
  {
    accessorKey: 'endedReason',
    header: 'Ended Reason',
    cell: ({ row }) => row.original.endedReason || 'N/A'
  },
  {
    accessorKey: 'recordingUrl',
    header: 'Playback',
    cell: ({ row }) => {
      const recordingUrl = row.original.recordingUrl;
      return recordingUrl ? (
        <PlayButton audioSrc={recordingUrl} />
      ) : (
        'No Recording'
      );
    }
  },
  // Use the TranscriptCell component to manage state
  {
    accessorKey: 'transcript',
    header: 'Transcript',
    cell: ({ row }) => (
      <TranscriptCell
        transcript={row.original.transcript || 'No transcript available'}
      />
    )
  }
  // Use the MessagesCell component to manage state
];
