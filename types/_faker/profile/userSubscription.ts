import { APP_TESTING_MODE } from '../../../constants/data';

export interface UserProfileSubscription {
  id: string;
  name: string; // Plan name, e.g., "Basic", "Enterprise"
  type: 'monthly' | 'yearly';
  status: 'active' | 'inactive';
  price: string; // Subscription price
  aiCredits: {
    allotted: number; // Total AI credits allotted
    used: number; // AI credits used
    resetInDays: number; // Countdown for next credit reset in days
  };
  leads: number; // Number of leads included in the plan
  skipTraces: number; // Number of skip traces included in the plan
  renewalDate: string; // Date of renewal
  createdAt: string; // Date of creation
  planDetails: string; // Extra details about the plan
}

const planDetails = {
  earlyAdopter: {
    name: 'Early Adopter',
    price: '1200',
    aiCredits: {
      allotted: 1200,
      used: 200, // Example usage
      resetInDays: 15 // Example reset countdown
    },
    leads: 200,
    skipTraces: 50
  },
  basic: {
    name: 'Basic',
    price: '2400',
    aiCredits: {
      allotted: 2400,
      used: 500, // Example usage
      resetInDays: 30 // Example reset countdown
    },
    leads: 500,
    skipTraces: 100
  },
  enterprise: {
    name: 'Enterprise',
    price: '5000',
    aiCredits: {
      allotted: 5000,
      used: 1000, // Example usage
      resetInDays: 7 // Example reset countdown
    },
    leads: 1000,
    skipTraces: 300
  }
};

// Function to generate mock subscriptions based on the plan details
const generateMockSubscriptions = (): UserProfileSubscription[] => {
  const subscriptions: UserProfileSubscription[] = [
    {
      id: '1', // Unique identifier for the subscription
      name: planDetails.earlyAdopter.name,
      type: 'monthly',
      status: 'active',
      price: `$${planDetails.earlyAdopter.price}`,
      aiCredits: planDetails.earlyAdopter.aiCredits,
      leads: planDetails.earlyAdopter.leads,
      skipTraces: planDetails.earlyAdopter.skipTraces,
      renewalDate: 'Sep 09, 2024', // Example renewal date
      createdAt: 'Sep 09, 2023', // Example creation date
      planDetails:
        'This is an early adopter subscription plan offering AI features at a discounted rate.'
    },
    {
      id: '2',
      name: planDetails.basic.name,
      type: 'yearly',
      status: 'inactive',
      price: `$${planDetails.basic.price}`,
      aiCredits: planDetails.basic.aiCredits,
      leads: planDetails.basic.leads,
      skipTraces: planDetails.basic.skipTraces,
      renewalDate: 'Aug 12, 2024',
      createdAt: 'Aug 12, 2023',
      planDetails:
        'This basic plan includes 2400 AI credits and access to 500 leads and 100 skip traces.'
    },
    {
      id: '3',
      name: planDetails.enterprise.name,
      type: 'yearly',
      status: 'active',
      price: `$${planDetails.enterprise.price}`,
      aiCredits: planDetails.enterprise.aiCredits,
      leads: planDetails.enterprise.leads,
      skipTraces: planDetails.enterprise.skipTraces,
      renewalDate: 'Jan 01, 2025',
      createdAt: 'Jan 01, 2024',
      planDetails:
        'Enterprise plan offers top-tier access with 5000 AI credits, 1000 leads, and 300 skip traces.'
    }
  ];

  return subscriptions;
};

// Usage of mock data for testing
export const mockSubscriptions =
  APP_TESTING_MODE && generateMockSubscriptions();
