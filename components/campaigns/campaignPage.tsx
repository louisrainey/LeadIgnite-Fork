'use client';
import React, { useState } from 'react';
import CampaignHeader from './utils/campaignHeader';
import CampaignsMainContent from './utils/campaignTable';
import { exampleCampaignsData } from '@/constants/data/campaigns';

const CampaignPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Campaigns');
  return (
    <div className="p-8  dark:bg-gray-900">
      <CampaignHeader
        totalCampaigns={10}
        totalCalls={150}
        totalConversations={75}
        totalTexts={120}
        totalEmails={85}
        totalDMs={40}
        creditsRemaining={25}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
      <CampaignsMainContent totalCampaigns={1} />
    </div>
  );
};

export default CampaignPage;
