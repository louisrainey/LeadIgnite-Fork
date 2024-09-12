import { create } from 'zustand';
import { mockCallCampaignData } from '@/types/_faker/calls/callCampaign';
import { mockGeneratedSampleEmailCampaigns } from '@/types/_faker/emails/emailCampaign';
import { mockTextCampaigns } from '@/types/_faker/texts/textCampaign';
import { mockSocialMediaCampaigns } from '@/types/_faker/social/socialCampaigns';
import { CallCampaign, SocialMediaCampaign } from '@/types/_dashboard/campaign';
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
  setCampaignType: (type: 'email' | 'call' | 'text' | 'social') => void;
  getNumberOfCampaigns: () => number;
}

// Create Zustand store
export const useCampaignStore = create<CampaignState>((set, get) => ({
  currentCampaignType: 'call', // Default to 'call'
  currentCampaign: mockCallCampaignData, // Default campaign data (calls)

  // Action to set the current campaign type and update the campaign data accordingly
  setCampaignType: (type) => {
    // Explicitly define the type of `campaignData` as a union type
    let campaignData: (
      | EmailCampaign
      | CallCampaign
      | TextMessageCampaign
      | SocialMediaCampaign
    )[] = [];

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

    set({ currentCampaignType: type, currentCampaign: campaignData });
  },

  // Getter for the number of campaigns in the current type
  getNumberOfCampaigns: () => {
    const { currentCampaign } = get();
    return currentCampaign.length || 0;
  }
}));
