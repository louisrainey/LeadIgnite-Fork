import { UserProfile } from '@/types/userProfile';
import { mockLeadListData } from '../dashboard/leadList';
import {
  mockBillingHistory,
  mockPaymentDetails
} from '@/types/_faker/profile/userData';
import { faker } from '@faker-js/faker'; // Import Faker.js for random data generation

// Mocking a user profile with Faker.js
export const mockUserProfile: UserProfile = {
  UniqueIdentifier: faker.string.uuid(), // Generates a UUID, // Generate unique ID
  subscription: {
    id: faker.string.uuid(),
    name: 'Enterprise Plan', // Static, or you can randomize it
    type: 'monthly', // Random between 'monthly' or 'yearly'
    status: 'active', // Static or random between 'active'/'inactive'
    price: `$${faker.number.float({ min: 100, max: 500 })}`, // Generate random price between $100 and $500 with 2 decimal places
    aiCredits: faker.number.int({ min: 100, max: 1000 }), // Random AI credits
    leads: faker.number.int({ min: 100, max: 1000 }), // Random number of leads
    skipTraces: faker.number.int({ min: 0, max: 500 }), // Random skip traces
    renewalDate: faker.date.future().toISOString(), // Generate future renewal date
    createdAt: faker.date.past().toISOString(), // Generate past creation date
    planDetails: 'Includes AI and skip tracing services' // Static, but can be randomized
  },
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  country: faker.address.country(),
  city: faker.address.city(),

  leadPreferences: {
    preferredLocation: [faker.address.city(), faker.address.city()],
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
        location: faker.address.city()
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
    companyLogo: 'logo.png', // Static, can be a URL or file path
    GHLID: { locationId: faker.string.uuid() }, // Random location ID
    campaigns: {
      textCampaigns: [], // Assuming these arrays are populated elsewhere
      emailCampaigns: [],
      socialCampaigns: [],
      callCampaigns: []
    },
    forwardingNumber: faker.phone.number(),
    leadList: [], // Assuming lead list is generated or static
    campaignAnalytics: [], // Assuming campaign analytics is generated or static
    leadLists: [] // Assuming lead lists are generated or static
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

  teamMembers: [
    {
      id: faker.string.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      role: faker.helpers.arrayElement(['admin', 'member']),
      permissions: {
        canGenerateLeads: faker.datatype.boolean(),
        canStartCampaigns: faker.datatype.boolean(),
        canViewReports: faker.datatype.boolean(),
        canManageTeam: faker.datatype.boolean(),
        canManageSubscription: faker.datatype.boolean(),
        canAccessAI: faker.datatype.boolean(),
        canEditCompanyProfile: faker.datatype.boolean()
      }
    }
  ],

  activityLog: [
    {
      action: faker.helpers.arrayElement(['created', 'updated', 'deleted']),
      timestamp: faker.date.recent(),
      performedBy: faker.name.firstName()
    }
  ],

  securitySettings: {
    lastLoginTime: faker.date.recent(),
    passwordUpdatedAt: faker.date.past()
  }
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
    aiCredits: 1000,
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
    companyLogo: 'logo.png', // Replace with appropriate image type or file
    GHLID: { locationId: 'business-123' }, // Mocked ID for sub-account
    campaigns: {
      textCampaigns: [],
      emailCampaigns: [],
      socialCampaigns: [],
      callCampaigns: []
    },
    forwardingNumber: '+1234567890',
    leadList: mockLeadListData,
    campaignAnalytics: [],
    leadLists: []
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
        canEditCompanyProfile: true
      }
    }
  ],

  activityLog: [
    { action: 'created', timestamp: new Date(), performedBy: 'John Doe' }
  ],

  securitySettings: {
    lastLoginTime: new Date(),
    passwordUpdatedAt: new Date('2023-01-15')
  }
};
