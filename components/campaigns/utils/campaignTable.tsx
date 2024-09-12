import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { RefreshCw } from 'lucide-react';
import * as OutReachAnimation from '@/public/lottie/CampaignPing.json';
import MultiStepCampaign from '@/components/reusables/modals/startCampaigns';

import { CallCampaignTable } from '@/components/tables/calls-table/call-campaign-table';
import { callCampaignColumns } from '@/components/tables/calls-table/columns';
import { TextMessageCampaignTable } from '@/components/tables/text-table/social-campaign-table';
import { textMessageCampaignColumns } from '@/components/tables/text-table/columns';
import { SocialMediaCampaignTable } from '@/components/tables/socials-table/social-campaign-table';
import { socialMediaCampaignColumns } from '@/components/tables/socials-table/columns';
import { useCampaignStore } from '@/lib/stores/campaigns';
import { EmailCampaignTable } from '@/components/tables/emails-table/email-campaign-table';
import { emailCampaignColumns } from '@/components/tables/emails-table/columns';
import { CallCampaign, SocialMediaCampaign } from '@/types/_dashboard/campaign';
import { EmailCampaign } from '@/types/goHighLevel/conversations';
import { TextMessageCampaign } from '@/types/goHighLevel/text';

const CampaignsMainContent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Zustand store state selectors
  const currentCampaignType = useCampaignStore(
    (state) => state.currentCampaignType
  );
  const filteredCampaigns = useCampaignStore(
    (state) => state.filteredCampaigns
  );
  const getNumberOfCampaigns = useCampaignStore(
    (state) => state.getNumberOfCampaigns
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const totalCampaigns = getNumberOfCampaigns(); // Get the total number of filtered campaigns
  const renderCampaignTable = () => {
    switch (currentCampaignType) {
      case 'email':
        return (
          <EmailCampaignTable
            columns={emailCampaignColumns}
            data={filteredCampaigns as EmailCampaign[]} // Type assertion for EmailCampaign data
            searchKey="name"
            pageCount={Math.ceil(filteredCampaigns.length / 10)}
          />
        );
      case 'call':
        return (
          <CallCampaignTable
            columns={callCampaignColumns}
            data={filteredCampaigns as CallCampaign[]} // Type assertion for CallCampaign data
            searchKey="calls"
            pageCount={Math.ceil(filteredCampaigns.length / 10)}
          />
        );
      case 'text':
        return (
          <TextMessageCampaignTable
            columns={textMessageCampaignColumns}
            data={filteredCampaigns as TextMessageCampaign[]} // Type assertion for TextMessageCampaign data
            searchKey="name"
            pageCount={Math.ceil(filteredCampaigns.length / 10)}
          />
        );
      case 'social':
        return (
          <SocialMediaCampaignTable
            columns={socialMediaCampaignColumns}
            data={filteredCampaigns as SocialMediaCampaign[]} // Type assertion for SocialMediaCampaign data
            searchKey="name"
            pageCount={Math.ceil(filteredCampaigns.length / 10)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full rounded-md bg-white dark:bg-gray-900 ">
      {/* Header with Create Campaign button, Last updated, and Export to CSV */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={openModal}
          className="rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <i className="fas fa-rocket mr-2"></i>
          Create Campaign
        </button>

        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <span>Updated 8 minutes ago</span>
            <button className="rounded-md p-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-700">
              <RefreshCw
                size={18}
                className="text-gray-600 dark:text-gray-300"
              />
            </button>
          </div>

          <button className="flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700">
            <i className="fas fa-file-export mr-2"></i>
            Export to CSV
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex h-full w-full flex-col items-center justify-center text-center">
        {totalCampaigns === 0 ? (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="mb-4 h-48 w-48">
              <Lottie animationData={OutReachAnimation} loop autoplay />
            </div>

            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
              Start your first campaign
            </h2>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Click the button below to get started with your first campaign.
            </p>

            <button
              onClick={openModal}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <i className="fas fa-rocket mr-2"></i> Create Campaign
            </button>
          </div>
        ) : (
          renderCampaignTable() // Render the table based on the filtered campaigns
        )}
      </div>

      {/* Modal for multi-step campaign */}
      {isModalOpen && <MultiStepCampaign closeModal={closeModal} />}
    </div>
  );
};

export default CampaignsMainContent;
