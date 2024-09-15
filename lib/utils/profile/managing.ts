import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Define the interface for the user's subscription
export interface UserProfileSubscription {
  id: string;
  name: string; // Plan name, e.g., "Basic", "Enterprise"
  type: 'monthly' | 'yearly';
  status: 'active' | 'inactive';
  price: string; // Subscription price
  aiCredits: number; // AI credits based on the plan
  leads: number; // Number of leads included in the plan
  skipTraces: number; // Number of skip traces included in the plan
  renewalDate: string; // Date of renewal
  createdAt: string; // Date of creation
  planDetails: string; // Extra details about the plan
}

// Hook to get user credits (replace with actual logic)
export const useCredits = (
  subscription: UserProfileSubscription | null
): number => {
  if (!subscription) return 0;
  return subscription.aiCredits;
};

// Hook to check if the user is logged in (replace with actual logic)
export const useIsLoggedIn = (): boolean => {
  const token = localStorage.getItem('userToken'); // Example: using a token in localStorage
  return !!token; // If the token exists, the user is logged in
};

// Hook to check subscription status and details
export const useSubscription = (
  subscription: UserProfileSubscription | null
) => {
  if (!subscription) {
    return {
      isSubscribed: false,
      planDetails: '',
      renewalDate: ''
    };
  }

  return {
    isSubscribed: subscription.status === 'active',
    planDetails: subscription.planDetails,
    renewalDate: subscription.renewalDate
  };
};

// Main custom hook for redirect logic in Next.js
export const useUserValidation = (
  subscription: UserProfileSubscription | null
): void => {
  const router = useRouter(); // Use Next.js router

  const isLoggedIn = useIsLoggedIn();
  const { isSubscribed } = useSubscription(subscription);

  useEffect(() => {
    // If the user is not logged in, redirect to `/logout`
    if (!isLoggedIn) {
      router.push('/logout');
      return;
    }

    // If the user is logged in but not subscribed, redirect to `/profile`
    if (!isSubscribed) {
      router.push('/profile');
    }
  }, [isLoggedIn, isSubscribed, router]);
};
