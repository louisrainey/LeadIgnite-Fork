import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { RefreshCw } from 'lucide-react'; // You can also use FontAwesome if needed
import * as OutReachAnimation from '@/public/lottie/CampaignPing.json'; // Path to the Lottie animation
import CampaignsTable from './tables/main';
import { exampleCampaignsData } from '@/constants/dashboard/campaigns';
import MultiStepCampaign from '@/components/reusables/modals/startCampaigns';
import { CallCampaignTable } from '@/components/tables/calls-table/call-campaign-table';
import { mockCallCampaignData } from '@/types/_faker/calls/callCampaign';
import { callCampaignColumns } from '@/components/tables/calls-table/columns';
import { EmailCampaignTable } from '@/components/tables/emails-table/email-campaign-table';
import { emailCampaignColumns } from '@/components/tables/emails-table/columns';
import { mockGeneratedSampleEmailCampaigns } from '@/types/_faker/emails/emailCampaign';

interface NoCampaignsProps {
  totalCampaigns: number; // Number of total campaigns
}

const CampaignsMainContent: React.FC<NoCampaignsProps> = ({
  totalCampaigns
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state management

  const openModal = () => setIsModalOpen(true); // Open modal
  const closeModal = () => setIsModalOpen(false); // Close modal

  return (
    <div className="h-full w-full rounded-md bg-white dark:bg-gray-900 ">
      {/* Header with Create Campaign button, Last updated, and Export to CSV */}
      <div className="flex items-center justify-between p-4">
        {/* Create Campaign Button */}
        <button
          onClick={openModal}
          className="rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <i className="fas fa-rocket mr-2"></i>
          Create Campaign
        </button>

        <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
          {/* Updated time with refresh button */}
          <div className="flex items-center space-x-2">
            <span>Updated 8 minutes ago</span>
            <button className="rounded-md p-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-700">
              <RefreshCw
                size={18}
                className="text-gray-600 dark:text-gray-300"
              />
            </button>
          </div>

          {/* Export to CSV Button */}
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
            {/* Lottie Animation */}
            <div className="mb-4 h-48 w-48">
              <Lottie animationData={OutReachAnimation} loop autoplay />
            </div>

            {/* Text and Button */}
            <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
              Start your first campaign
            </h2>
            <p className="mb-4 text-gray-500 dark:text-gray-400">
              Click the button below to get started with your first campaign.
            </p>

            {/* Create Campaign Button */}
            <button
              onClick={openModal}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <i className="fas fa-rocket mr-2"></i> Create Campaign
            </button>
          </div>
        ) : (
          // <CallCampaignTable
          //   columns={callCampaignColumns}
          //   data={mockCallCampaignData}
          //   searchKey="calls"
          //   pageCount={Math.ceil(mockCallCampaignData.length / 10)} // Adjust page count based on the total data length
          // />
          //   <IndividualCallResponseTable
          //   columns={SingleCallResponseColumns}
          //   data={mockIndividualCallData}
          //   pageCount={10} // Define how many pages you expect
          //   searchKey="id" // Define the key for search functionality
          // />
          <EmailCampaignTable
            columns={emailCampaignColumns}
            data={mockGeneratedSampleEmailCampaigns}
            searchKey="name"
            pageCount={10}
          />
        )}
      </div>

      {/* Modal for multi-step campaign */}
      {isModalOpen && <MultiStepCampaign closeModal={closeModal} />}
    </div>
  );
};

export default CampaignsMainContent;
