import { GetCallResponse } from '../vapiAi/api/calls/get';

// Common fields for all campaigns
export interface CampaignBase {
  id: string;
  name: string;
  goal?: string;
  status:
    | 'delivered'
    | 'delivering'
    | 'failed'
    | 'pending'
    | 'completed'
    | 'missed'
    | 'queued'
    | 'read'
    | 'unread';
  startDate: string;
  endDate?: string;
  aiVoice?: string;
  aiScript?: string;
  aiAvatarAgent?: string;
}

// Specific types for Text Campaigns
export interface TextCampaign extends CampaignBase {
  phoneNumber: string;
  message: string;
  sentAt: Date;
  status: 'delivered' | 'failed' | 'pending'; // Overrides status for text-specific values
}

// Specific types for Call Campaigns
export interface CallCampaign extends CampaignBase {
  vapi: GetCallResponse;
  callerNumber: string;
  receiverNumber: string;
  duration: number; // in seconds
  callType: 'inbound' | 'outbound';
  timestamp?: Date; // Add this if `timestamp` is needed for tracking
  // Additional fields specific to the call campaign
  calls: number;
  inQueue: number;
  leads: number;
  voicemail: number;
  hungUp: number;
  dead: number;
  wrongNumber: number;
  inactiveNumber: number;
  dnc: number;
}

export type Action = {
  type:
    | 'Comment'
    | 'Like'
    | 'Follow'
    | 'Story'
    | 'ConnectionRequest'
    | 'Invite'
    | 'Share'
    | '📩 Connections'
    | '📩 Groups'
    | '📩 Followers'
    | '👁️ Story'
    | 'Connect + Follow Up'
    | 'Invite to follow';
  status: 'pending' | 'successful' | 'failed'; // Status of each action
  attempt: number; // Number of attempts
  successful: number; // Number of successful executions
  failed: number; // Number of failed executions

  // Only for actions with 📩 in the type, if the action was successful
  replyMessage?: string; // Optional message reply
  viewLink?: string; // Optional link to view details
};

// Specific types for DM Campaigns
export interface SocialMediaCampaign extends CampaignBase {
  platform: 'Twitter' | 'Instagram' | 'LinkedIn';
  senderHandle: string;
  receiverHandle: string;
  hashtags: string[]; // List of relevant hashtags
  sentAt: Date;
  startDate: string;
  endDate: string;
  status: 'pending' | 'completed' | 'failed'; // General status for the campaign
  actions: Action[]; // Array of actions using the Action type
}

// Specific types for Email Campaigns
export interface EmailCampaign extends CampaignBase {
  ghlID: string;

  fromEmail: string;
  toEmail: string;
  subject: string;
  body: string;
  sentAt: Date;
}

// Enum-like type for campaign categories
export type CampaignType =
  | 'text'
  | 'call'
  | 'dm'
  | 'email'
  | 'total'
  | 'conversations';

// A Stat type that could be reused for each campaign type in various views
export type Stat = {
  title: string;
  value: number;
  statType: CampaignType; // StatType should match the campaign types
  click: boolean;
  past24hours: number;
  rowSpan?: number; // Optional rowSpan value
  colSpan?: number; // Optional colSpan value
};

// Reusable type for campaign data
// Updated Campaign type to include primaryType and secondaryType
export type Campaign = (
  | TextCampaign
  | CallCampaign
  | SocialMediaCampaign
  | EmailCampaign
) & {
  primaryType: CampaignType;
  secondaryType: CampaignType;
};

// Optional runtime validation logic
export function validateCampaignTypes(campaign: Campaign) {
  if (campaign.primaryType === campaign.secondaryType) {
    throw new Error('Primary and secondary types cannot be the same.');
  }

  const socialMediaTypes = ['dm']; // Add other social media types here if needed
  if (
    socialMediaTypes.includes(campaign.primaryType) &&
    socialMediaTypes.includes(campaign.secondaryType)
  ) {
    throw new Error(
      'Both primary and secondary types cannot be social media types.'
    );
  }
}
