import { UserProfile } from '@/types/userProfile';
import {
  mockBillingHistory,
  mockPaymentDetails
} from '@/types/_faker/profile/userData';
import { faker } from '@faker-js/faker'; // Import Faker.js for random data generation
import { mockTextCampaigns } from '@/types/_faker/texts/textCampaign';
import { mockGeneratedSampleEmailCampaigns } from '@/types/_faker/emails/emailCampaign';
import { mockSocialMediaCampaigns } from '@/types/_faker/social/socialCampaigns';
import { mockCallCampaignData } from '@/types/_faker/calls/callCampaign';
import { mockEmailCampaignAnalytics } from '@/types/_faker/analytics/email';
import { mockCallCampaignAnalytics } from '@/types/_faker/analytics/call';
import { mockTextMessageCampaignAnalytics } from '@/types/_faker/analytics/text';
import { EmailCampaignAnalytics } from '@/types/goHighLevel/email';
import { TextMessageCampaignAnalytics } from '@/types/goHighLevel/text';
import { CallCampaignAnalytics } from '@/types/vapiAi/api/calls/get';
import { mockLeadListData } from '@/constants/dashboard/leadList';
import { APP_TESTING_MODE, mockGeneratedLeads } from '@/constants/data';
import { mockKanbanState } from '../kanban';
import { mockTeamMembers } from './team/members';
import { mockTrackingData } from './team/tasks';
import { mockSubscriptions } from './userSubscription';

// Mocking a user profile with Faker.js
export const mockUserProfile: UserProfile = {
  UniqueIdentifier: faker.string.uuid(), // Generates a UUID, // Generate unique ID
  subscription: mockSubscriptions[0],
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  country: faker.location.country(),
  city: faker.location.city(),

  leadPreferences: {
    preferredLocation: [faker.location.city(), faker.address.city()],
    industry: 'Real Estate', // Static or use faker.commerce.department()
    minLeadQuality: faker.number.int({ min: 60, max: 100 }),
    maxBudget: faker.number.int({ min: 1000, max: 10000 })
  },
  savedSearches: [
    {
      id: faker.string.uuid(),
      name: 'High-Quality Leads', // Static or faker.commerce.productName()
      searchCriteria: {
        quality: 'high',
        location: faker.location.city()
      },
      createdAt: faker.date.recent()
    }
  ],
  notificationPreferences: {
    emailNotifications: faker.datatype.boolean(),
    smsNotifications: faker.datatype.boolean(),
    notifyForNewLeads: faker.datatype.boolean(),
    notifyForCampaignUpdates: faker.datatype.boolean()
  },
  integrations: [
    {
      platform: 'Salesforce', // Static
      apiKey: faker.string.uuid(), // Random UUID
      status: faker.helpers.arrayElement(['connected', 'disconnected']) // Random status
    }
  ],

  companyInfo: {
    companyName: faker.company.name(),
    webhook: faker.internet.url(),
    companyLogo: 'logo.png', // Static, can be a URL or file path
    GHLID: { locationId: faker.string.uuid() }, // Random location ID
    campaigns: {
      textCampaigns: mockTextCampaigns, // Assuming these arrays are populated elsewhere
      emailCampaigns: mockGeneratedSampleEmailCampaigns,
      socialCampaigns: mockSocialMediaCampaigns,
      callCampaigns: mockCallCampaignData
    },
    KanbanTasks: mockKanbanState,
    forwardingNumber: faker.phone.number(),
    campaignAnalytics: [
      mockCallCampaignAnalytics,
      mockTextMessageCampaignAnalytics,
      mockEmailCampaignAnalytics
    ] as (
      | EmailCampaignAnalytics
      | CallCampaignAnalytics
      | TextMessageCampaignAnalytics
    )[],
    leads: mockGeneratedLeads,
    leadLists: mockLeadListData // Assuming lead lists are generated or static
  },

  aIKnowledgebase: {
    emailTemplate: 'Welcome to our real estate service...', // Static or faker.lorem.sentence()
    salesScript: 'Use this script when calling...', // Static or faker.lorem.sentence()
    assignedAssistantID: faker.helpers.arrayElement(['ai', 'female', 'male']),
    assignedSquadID: faker.string.uuid()
  },

  billingHistory: [
    {
      invoice: faker.string.uuid(),
      amount: faker.finance.amount(),
      status: faker.helpers.arrayElement(['Paid', 'Unpaid']),
      date: faker.date.past()
    }
  ],
  paymentDetails: {
    cardLastFour: faker.finance.creditCardNumber().slice(-4), // Extracts the last 4 digits
    expiry: faker.date
      .future()
      .toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }), // Outputs in MM/YY format
    cardType: faker.finance.creditCardIssuer() // Card issuer (Visa, MasterCard, etc.)
  },

  twoFactorAuth: {
    isEnabled: faker.datatype.boolean(),
    methods: {
      sms: faker.datatype.boolean(),
      email: faker.datatype.boolean(),
      authenticatorApp: faker.datatype.boolean()
    },
    lastEnabledAt: faker.date.past()
  },

  teamMembers: mockTeamMembers,

  activityLog: [
    {
      action: faker.helpers.arrayElement(['created', 'updated', 'deleted']),
      timestamp: faker.date.recent(),
      performedBy: faker.person.firstName(),
      taskTracking: mockTrackingData
    }
  ],

  securitySettings: {
    lastLoginTime: faker.date.recent(),
    passwordUpdatedAt: faker.date.past()
  }
};

export const MockUserProfile = APP_TESTING_MODE && mockUserProfile;
