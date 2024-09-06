import React from 'react';

interface DashboardStatsProps {
  totalCampaigns: number;
  totalCalls: number;
  totalConversations: number;
  creditsRemaining: number;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalCampaigns,
  totalCalls,
  totalConversations,
  creditsRemaining,
  activeFilter,
  setActiveFilter
}) => {
  return (
    <div className="p-4 dark:bg-gray-900">
      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md border px-4 py-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
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
        {/* Total Campaigns */}
        <div className="rounded-md bg-white p-4 text-center shadow-md dark:bg-gray-800 dark:text-white">
          <p>Total Campaigns</p>
          <h2 className="text-3xl font-bold">{totalCampaigns}</h2>
        </div>

        {/* Total Calls */}
        <div className="rounded-md bg-white p-4 text-center shadow-md dark:bg-gray-800 dark:text-white">
          <p>Total Calls</p>
          <h2 className="text-3xl font-bold">{totalCalls}</h2>
        </div>

        {/* Total Conversations */}
        <div className="rounded-md bg-white p-4 text-center shadow-md dark:bg-gray-800 dark:text-white">
          <p>Total Conversations</p>
          <h2 className="text-3xl font-bold">{totalConversations}</h2>
        </div>

        {/* Credits Remaining */}
        <div className="rounded-md bg-white p-4 text-center shadow-md dark:bg-gray-800 dark:text-white">
          <p>Credits Remaining</p>
          <h2 className="text-3xl font-bold">{creditsRemaining}</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
