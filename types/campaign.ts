// Common fields for all campaigns
export interface CampaignBase {
  id: string;
  name: string;
  status:
    | 'delivered'
    | 'failed'
    | 'pending'
    | 'completed'
    | 'missed'
    | 'queued'
    | 'read'
    | 'unread';
  startDate: string;
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
  callerNumber: string;
  receiverNumber: string;
  duration: number; // in seconds
  callType: 'inbound' | 'outbound';
  status: 'completed' | 'missed' | 'failed'; // Call-specific status
  timestamp: Date;

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

// Specific types for DM Campaigns
export interface DMCampaign extends CampaignBase {
  platform: 'Twitter' | 'Instagram' | 'Facebook';
  senderHandle: string;
  receiverHandle: string;
  message: string;
  sentAt: Date;
  status: 'read' | 'unread' | 'failed'; // Overrides status for DM-specific values
}

// Specific types for Email Campaigns
export interface EmailCampaign extends CampaignBase {
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
export type Campaign = TextCampaign | CallCampaign | DMCampaign | EmailCampaign;
