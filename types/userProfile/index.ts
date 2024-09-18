import { LeadList } from '@/constants/dashboard/leadList';
import {
  Business,
  GetSubAccountPathParams
} from '@/types/goHighLevel/subAccounts';
import { UniqueIdentifier } from '@dnd-kit/core';
import {
  TextCampaign,
  SocialMediaCampaign,
  CallCampaign
} from '../_dashboard/campaign';
import { BillingHistoryItem, PaymentDetails } from '../_faker/profile/userData';
import { UserProfileSubscription } from '../_faker/profile/userSubscription';
import { EmailCampaign, EmailCampaignAnalytics } from '../goHighLevel/email';
import { GetSquadResponse } from '../vapiAi/api/squad/get';
import {
  GHLTextMessageCampaign,
  TextMessageCampaignAnalytics
} from '../goHighLevel/text';
import { CallCampaignAnalytics } from '../vapiAi/api/calls/get';
import {
  KanbanState,
  Task,
  TaskActivity,
  TaskTracking
} from '@/lib/stores/taskActions';
import { LeadTypeGlobal } from '../_dashboard/leads';

export interface LeadPreferences {
  preferredLocation: string[]; // Array of preferred locations
  industry: string; // Preferred industry for leads
  minLeadQuality: number; // Minimum lead quality (1-100)
  maxBudget: number; // Maximum budget user is willing to spend on leads
}

// Saved Searches & Lead Lists
export interface SavedSearch {
  id: string; // Unique identifier for the saved search
  name: string; // Name of the saved search
  searchCriteria: Record<string, any>; // The filters/criteria applied for this saved search
  createdAt: Date; // Date the search was saved
}

export interface Integration {
  platform: string; // Name of the platform, e.g., 'Salesforce', 'HubSpot'
  apiKey: string; // API key or credentials for integration
  status: 'connected' | 'disconnected'; // Integration status
}
// Two-Factor Authentication (2FA) Type
export interface TwoFactorAuth {
  isEnabled: boolean; // Whether 2FA is enabled or not
  methods: {
    sms: boolean; // SMS-based 2FA
    email: boolean; // Email-based 2FA
    authenticatorApp: boolean; // Authenticator app like Google Authenticator
  };
  lastEnabledAt: Date | null; // Date when 2FA was last enabled, can be null if never enabled
}

// UserPermissions for team members
export interface UserPermissions {
  canGenerateLeads: boolean; // Whether the team member can generate leads
  canStartCampaigns: boolean; // Whether the team member can start campaigns
  canViewReports: boolean; // Whether the team member can view reports
  canManageTeam: boolean; // Whether the team member can manage other team members
  canManageSubscription: boolean; // Whether the team member can manage the subscription or billing
  canAccessAI: boolean; // Whether the team member can access AI-based tools
  canMoveCompanyTasks: boolean;
  canEditCompanyProfile: boolean; // Whether the team member can edit company profile information
}

export interface NotificationPreferences {
  emailNotifications: boolean; // Whether the user wants to receive email notifications
  smsNotifications: boolean; // Whether the user wants SMS notifications
  notifyForNewLeads: boolean; // Notify when new leads are available
  notifyForCampaignUpdates: boolean; // Notify when campaigns are updated
}
// Team Member Type
export interface TeamMember {
  id: string; // Unique identifier for the team member
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'member'; // Roles for team members, can be extended with more roles
  permissions: UserPermissions; // UserPermissions granted to the team member
  NotificationPreferences?: NotificationPreferences;
  twoFactorAuth?: TwoFactorAuth;
  activityLog?: ActivityLog;
}

// Campaigns for Company
export interface CompanyCampaignsUserProfile {
  textCampaigns: GHLTextMessageCampaign[];
  emailCampaigns: EmailCampaign[];
  socialCampaigns: SocialMediaCampaign[];
  callCampaigns: CallCampaign[];
}

export interface ActivityLog {
  action: string; // Action performed, e.g., 'created', 'updated'
  timestamp: Date; // When the action was performed
  performedBy: string; // Who performed the action
  taskTracking: TaskTracking;
}

export interface SecuritySettings {
  lastLoginTime: Date | null; // Date of last login
  passwordUpdatedAt: Date | null; // When the password was last updated
}

export type CampaignAnalytics =
  | EmailCampaignAnalytics
  | TextMessageCampaignAnalytics
  | CallCampaignAnalytics;

// Company Info Type
export interface CompanyInfo {
  companyName: string;
  webhook?: string;
  companyLogo: File | String;
  GHLID: GetSubAccountPathParams;
  campaigns: CompanyCampaignsUserProfile;
  forwardingNumber: string;
  campaignAnalytics: CampaignAnalytics[]; // Array of analytics for user's campaigns
  leads: LeadTypeGlobal[];
  leadLists: LeadList[]; // Array of lead lists
  tasks: KanbanState;
}

// AI Knowledgebase Type
export interface AIKnowledgebase {
  emailTemplate?: string; // Optional email field, with potential Markdown/HTML validation
  salesScript?: string; // Optional sales script field
  assignedAssistantID: string; // e.g., 'female', 'male', 'ai'
  assignedSquadID: string;
}

export interface UserProfile {
  UniqueIdentifier: UniqueIdentifier;
  subscription: UserProfileSubscription; // Subscription information

  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;

  // New fields
  leadPreferences: LeadPreferences; // Preferences for lead generation
  savedSearches: SavedSearch[]; // Array of saved searches
  notificationPreferences: NotificationPreferences; // User notification settings
  integrations: Integration[]; // Array of connected platforms for integration
  companyInfo: CompanyInfo;
  aIKnowledgebase: AIKnowledgebase;
  billingHistory: BillingHistoryItem[]; // Billing history records
  paymentDetails: PaymentDetails; // Payment details like card info
  twoFactorAuth: TwoFactorAuth; // 2FA information
  teamMembers: TeamMember[]; // List of team members with permissions
  activityLog?: ActivityLog[]; // Log of user activities
  securitySettings?: SecuritySettings; // Security settings such as last login
}
