'use client';
import React, { useState } from 'react';
import CampaignHeader from './utils/campaignHeader';
import CampaignsMainContent from './utils/campaignTable';
import { exampleCampaignsData } from '@/constants/dashboard/campaigns';

const CampaignPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All Campaigns');
  return (
    <div className="p-8  dark:bg-gray-900">
      <CampaignHeader />
      <CampaignsMainContent />
    </div>
  );
};

export default CampaignPage;
