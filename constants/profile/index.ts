import { UserProfile } from '@/types/userProfile';
import { generateMockLeadLists, mockLeadListData } from '../dashboard/leadList';
import {
  mockBillingHistory,
  mockPaymentDetails
} from '@/types/_faker/profile/userData';
import { mockKanbanState } from '@/types/_faker/kanban';
import { TaskTracking } from '@/lib/stores/taskActions';
import { mockGeneratedLeads } from '../data';

// Mocking a user profile with Faker.js
const taskTracking: TaskTracking = {
  totalTasks: 0,
  tasksByStatus: {
    TODO: 0,
    IN_PROGRESS: 0,
    DONE: 0
  },
  tasksAssigned: 0,
  tasksCompleted: 0,
  tasksInProgress: 0,
  assignedTasks: {},
  taskHistory: [] // Add this to track task activities like created, updated, deleted
};

// Static mock user profile
export const mockUserProfileStatic: UserProfile = {
  UniqueIdentifier: 'user-unique-id-123',
  subscription: {
    id: 'sub-123',
    name: 'Enterprise Plan',
    type: 'monthly',
    status: 'active',
    price: '$299',
    aiCredits: {
      allotted: 1000, // Total AI credits allotted
      used: 300, // AI credits used so far
      resetInDays: 30 // Days until next credit reset
    },
    leads: 500,
    skipTraces: 200,
    renewalDate: '2024-01-01',
    createdAt: '2023-01-01',
    planDetails: 'Includes AI and skip tracing services'
  },
  firstName: 'John',
  lastName: 'Doe',
  email: 'johndoe@example.com',
  country: 'USA',
  city: 'New York',

  leadPreferences: {
    preferredLocation: ['New York', 'California'],
    industry: 'Real Estate',
    minLeadQuality: 80,
    maxBudget: 5000
  },
  savedSearches: [
    {
      id: 'search-1',
      name: 'High-Quality Leads',
      searchCriteria: { quality: 'high', location: 'New York' },
      createdAt: new Date()
    }
  ],
  notificationPreferences: {
    emailNotifications: true,
    smsNotifications: false,
    notifyForNewLeads: true,
    notifyForCampaignUpdates: true
  },
  integrations: [
    { platform: 'Salesforce', apiKey: 'key-123', status: 'connected' }
  ],

  companyInfo: {
    companyName: 'Doe Real Estate',
    webhook: 'https://mywebsite.com/webhook',
    companyLogo: 'logo.png', // Replace with appropriate image type or file
    GHLID: { locationId: 'business-123' }, // Mocked ID for sub-account
    campaigns: {
      textCampaigns: [],
      emailCampaigns: [],
      socialCampaigns: [],
      callCampaigns: []
    },
    tasks: mockKanbanState,
    forwardingNumber: '+1234567890',
    leads: mockGeneratedLeads,
    leadLists: mockLeadListData,
    campaignAnalytics: []
  },

  aIKnowledgebase: {
    emailTemplate: 'Welcome to our real estate service...',
    salesScript: 'Use this script when calling...',
    assignedAssistantID: 'ai', // 'ai', 'female', 'male'
    assignedSquadID: '3adasdadasd'
  },

  billingHistory: mockBillingHistory,
  paymentDetails: mockPaymentDetails,

  twoFactorAuth: {
    isEnabled: true,
    methods: {
      sms: true,
      email: false,
      authenticatorApp: true
    },
    lastEnabledAt: new Date('2023-06-01')
  },

  teamMembers: [
    {
      id: 'member-1',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      role: 'admin',
      permissions: {
        canGenerateLeads: true,
        canStartCampaigns: true,
        canViewReports: true,
        canManageTeam: true,
        canManageSubscription: true,
        canAccessAI: true,
        canEditCompanyProfile: true,
        canMoveCompanyTasks: false
      }
    }
  ],

  activityLog: [
    {
      action: 'created',
      timestamp: new Date(),
      performedBy: 'John Doe',
      taskTracking
    }
  ],

  securitySettings: {
    lastLoginTime: new Date(),
    passwordUpdatedAt: new Date('2023-01-15')
  }
};
