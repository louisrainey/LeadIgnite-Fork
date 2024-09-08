'use client';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import StatCard from './statCard';
import { Stat } from '@/types/campaign';

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

  const [activeIndex, setActiveIndex] = useState(0); // Track the currently animated card
  const [animationComplete, setAnimationComplete] = useState(false); // Track if the animation is completed
  const stats: Stat[] = [
    {
      title: 'Total Campaigns',
      value: totalCampaigns,
      statType: 'total',
      colSpan: 2,
      click: false,
      past24hours: 300
    },
    {
      title: 'Total Conversations',
      value: totalConversations,
      statType: 'conversations',
      colSpan: 2,
      click: false,
      past24hours: 300
    },
    {
      title: 'Total Calls',
      value: totalCalls,
      statType: 'call',
      click: true,
      past24hours: 300
    },
    {
      title: 'Total Texts',
      value: totalTexts,
      statType: 'text',
      click: true,
      past24hours: 300
    },
    {
      title: 'Total Emails',
      value: totalEmails,
      statType: 'email',
      click: true,
      past24hours: 300
    },
    {
      title: 'Total Interactions',
      value: totalDMs,
      statType: 'dm',
      click: true,
      past24hours: 300
    }
  ];

  const handleCardClick = (stat: string) => {
    // Navigate to the specific stat page, or log the clicked stat
    console.log(`Clicked on: ${stat}`);
    // Example: You could use React Router or a similar navigation solution
    // history.push(`/stats/${stat.toLowerCase()}`);
  };

  useEffect(() => {
    let currentIndex = 2; // Start from the third card (skip the first two)

    const interval = setInterval(() => {
      // Update active index
      setActiveIndex(currentIndex);

      // Stop the loop after reaching the last card
      if (currentIndex === stats.length - 1) {
        // Clear the interval right after reaching the last card
        clearInterval(interval);

        // Let the last card animate for 3 more seconds
        setTimeout(() => {
          setAnimationComplete(true); // Mark animation as complete
        }, 3000); // Keep the last card animated for 3 seconds
      } else {
        // Increment index for the next card
        currentIndex++;
      }
    }, 3000); // Switch active card every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [stats.length]);

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
            className={`${stat.colSpan && index < 2 ? 'md:col-span-2' : ''}`} // First two cards take 2 columns
          >
            <StatCard
              title={stat.title}
              addedToday={stat.past24hours}
              value={stat.value}
              onClick={() => console.log(`Clicked on ${stat.statType}`)}
              isActive={index === activeIndex} // Active if index matches activeIndex
              click={stat.click} // Control whether the card is clickable
              animationComplete={animationComplete} // Control whether the animation is complete
            />
          </div>
        ))}
      </div>

      {/* View Call Recordings Button */}
    </div>
  );
};

export default CampaignHeader;
