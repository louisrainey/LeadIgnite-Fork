import { create } from 'zustand';
import { mockCallCampaignData } from '@/types/_faker/calls/callCampaign';
import { mockGeneratedSampleEmailCampaigns } from '@/types/_faker/emails/emailCampaign';
import { mockTextCampaigns } from '@/types/_faker/texts/textCampaign';
import { mockSocialMediaCampaigns } from '@/types/_faker/social/socialCampaigns';
import {
  CallCampaign,
  SocialMediaCampaign,
  CampaignBase
} from '@/types/_dashboard/campaign';
import { EmailCampaign } from '@/types/goHighLevel/conversations';
import { TextMessageCampaign } from '@/types/goHighLevel/text';

// Define the campaign state and actions for Zustand
interface CampaignState {
  currentCampaignType: 'email' | 'call' | 'text' | 'social'; // Track the current campaign type
  currentCampaign: (
    | EmailCampaign
    | CallCampaign
    | TextMessageCampaign
    | SocialMediaCampaign
  )[]; // Holds the currently active campaign data
  filteredCampaigns: (
    | EmailCampaign
    | CallCampaign
    | TextMessageCampaign
    | SocialMediaCampaign
  )[]; // Holds the filtered campaigns
  setCampaignType: (type: 'email' | 'call' | 'text' | 'social') => void;
  filterCampaignsByStatus: (
    status: 'all' | 'scheduled' | 'active' | 'completed'
  ) => void;
  getNumberOfCampaigns: () => number;
}

// Create Zustand store
export const useCampaignStore = create<CampaignState>((set, get) => ({
  currentCampaignType: 'call', // Default to 'call'
  currentCampaign: mockCallCampaignData, // Default campaign data (calls)
  filteredCampaigns: mockCallCampaignData, // Start with no filter applied, showing all campaigns

  // Action to set the current campaign type and update the campaign data accordingly
  setCampaignType: (type) => {
    let campaignData: (
      | EmailCampaign
      | CallCampaign
      | TextMessageCampaign
      | SocialMediaCampaign
    )[] = [];

    // Update `currentCampaign` and `filteredCampaigns` based on selected type
    switch (type) {
      case 'email':
        campaignData = mockGeneratedSampleEmailCampaigns; // Email campaign data
        break;
      case 'call':
        campaignData = mockCallCampaignData; // Call campaign data
        break;
      case 'text':
        campaignData = mockTextCampaigns; // Text message campaign data
        break;
      case 'social':
        campaignData = mockSocialMediaCampaigns; // Social media campaign data
        break;
      default:
        campaignData = [];
    }

    // Set the new campaign data for both `currentCampaign` and `filteredCampaigns`
    set({
      currentCampaignType: type,
      currentCampaign: campaignData,
      filteredCampaigns: campaignData
    });
  },

  // Action to filter campaigns by status
  filterCampaignsByStatus: (status) => {
    const { currentCampaign } = get();
    let filteredCampaigns = currentCampaign;

    // Apply filtering based on the status
    switch (status) {
      case 'scheduled':
        filteredCampaigns = currentCampaign.filter(
          (campaign) =>
            campaign.status === 'pending' || campaign.status === 'queued'
        );
        break;
      case 'active':
        filteredCampaigns = currentCampaign.filter(
          (campaign) => campaign.status === 'delivering'
        );
        break;
      case 'completed':
        filteredCampaigns = currentCampaign.filter(
          (campaign) => campaign.status === 'completed'
        );
        break;
      case 'all':
      default:
        // For 'all', we don't filter and just show all campaigns
        filteredCampaigns = currentCampaign;
        break;
    }

    // Set the filtered campaigns
    set({ filteredCampaigns });
  },

  // Getter for the number of campaigns in the current type
  getNumberOfCampaigns: () => {
    const { filteredCampaigns } = get();
    return filteredCampaigns.length || 0;
  }
}));
