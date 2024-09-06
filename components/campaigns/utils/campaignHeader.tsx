import { Search } from 'lucide-react';
import React from 'react';
import StatCard from './statCard';

interface DashboardStatsProps {
  totalCampaigns: number;
  totalCalls: number;
  totalConversations: number;
  totalTexts: number;
  totalEmails: number;
  totalDMs: number;
  creditsRemaining: number;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

type Stat = {
  title: string;
  value: number;
  statType: string;
  rowSpan?: number; // Optional rowSpan value
  colSpan?: number; // Optional rowSpan value
};

const CampaignHeader: React.FC<DashboardStatsProps> = ({
  totalCampaigns,
  totalCalls,
  totalConversations,
  totalTexts,
  totalEmails,
  totalDMs,
  creditsRemaining,
  activeFilter,
  setActiveFilter
}) => {
  // Array of stats to render dynamically
  const stats: Stat[] = [
    {
      title: 'Total Campaigns',
      value: totalCampaigns,
      statType: 'campaigns',
      colSpan: 2
    },
    {
      title: 'Total Conversations',
      value: totalConversations,
      statType: 'conversations',
      colSpan: 2
    },
    { title: 'Total Calls', value: totalCalls, statType: 'calls' },
    { title: 'Total Texts', value: totalTexts, statType: 'texts' },
    { title: 'Total Emails', value: totalEmails, statType: 'emails' },
    { title: 'Total DMs', value: totalDMs, statType: 'dms' },
    { title: 'Credits Remaining', value: creditsRemaining, statType: 'credits' }
  ];

  const handleCardClick = (stat: string) => {
    // Navigate to the specific stat page, or log the clicked stat
    console.log(`Clicked on: ${stat}`);
    // Example: You could use React Router or a similar navigation solution
    // history.push(`/stats/${stat.toLowerCase()}`);
  };
  return (
    <div className="p-4 dark:bg-gray-900">
      {/* Credits Remaining Text */}
      <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
        Credits Remaining: {creditsRemaining}
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md border px-4 py-2 pl-10 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Campaign Filter Buttons */}
      <div className="mb-4 flex w-full gap-4">
        <button
          onClick={() => setActiveFilter('All Campaigns')}
          className={`flex w-1/4 items-center justify-center rounded-md px-4 py-2 ${
            activeFilter === 'All Campaigns'
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'bg-gray-100 dark:bg-gray-800'
          } dark:text-white`}
        >
          <span className="h-2 w-2 rounded-full bg-gray-500"></span>
          <span className="ml-2">All Campaigns</span>
        </button>
        <button
          onClick={() => setActiveFilter('Scheduled Campaigns')}
          className={`flex w-1/4 items-center justify-center rounded-md px-4 py-2 ${
            activeFilter === 'Scheduled Campaigns'
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'bg-gray-100 dark:bg-gray-800'
          } dark:text-white`}
        >
          <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
          <span className="ml-2">Scheduled Campaigns</span>
        </button>
        <button
          onClick={() => setActiveFilter('Active Campaigns')}
          className={`flex w-1/4 items-center justify-center rounded-md px-4 py-2 ${
            activeFilter === 'Active Campaigns'
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'bg-gray-100 dark:bg-gray-800'
          } dark:text-white`}
        >
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="ml-2">Active Campaigns</span>
        </button>
        <button
          onClick={() => setActiveFilter('Completed Campaigns')}
          className={`flex w-1/4 items-center justify-center rounded-md px-4 py-2 ${
            activeFilter === 'Completed Campaigns'
              ? 'bg-gray-200 dark:bg-gray-700'
              : 'bg-gray-100 dark:bg-gray-800'
          } dark:text-white`}
        >
          <span className="h-2 w-2 rounded-full bg-blue-500"></span>
          <span className="ml-2">Completed Campaigns</span>
        </button>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={`${
              index < 2 && stat.colSpan && stat.colSpan > 1
                ? 'md:col-span-2'
                : ''
            }`} // First two cards take 2 columns
          >
            <StatCard
              title={stat.title}
              value={stat.value}
              onClick={() => handleCardClick(stat.statType)}
            />
          </div>
        ))}
      </div>

      {/* View Call Recordings Button */}
      <div className="mt-6 flex justify-center">
        <button className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700">
          View Call Recordings
        </button>
      </div>
    </div>
  );
};

export default CampaignHeader;
