import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { BillingModal } from '@/components/reusables/modals/user/billing';
import { SecurityModal } from '@/components/reusables/modals/user/security';
import { UpgradeModal } from '@/components/reusables/modals/user/upgrade';
import AiUsageModal from '@/components/reusables/modals/user/usage';
import { WebhookModal } from '@/components/reusables/modals/user/webhook';
import { Toaster } from '@/components/ui/sonner';
import {
  mockBillingHistory,
  mockPaymentDetails
} from '@/types/_faker/profile/userData';
import { mockSubscriptions } from '@/types/_faker/profile/userSubscription';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { Metadata } from 'next';
import { useUserValidation } from '@/lib/utils/profile/managing';

export const metadata: Metadata = {
  title:
    'Lead Ignite Dashboard | Real Estate Property Search & Market Analysis',
  description:
    'Explore properties by location with the Lead Ignite Dashboard. Access in-depth market analysis and detailed property information to make informed decisions for your real estate business.'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  // Mock session and subscription for demonstration purposes (replace with actual data)
  const subscription = mockSubscriptions[0]; // Replace with real data fetching logic if available

  // Call the user validation hook (this will handle the redirects)
  useUserValidation(subscription); // Hook will redirect to /logout or /profile based on login/subscription status

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
      {/* Modals */}
      <AiUsageModal />
      <BillingModal
        billingHistory={mockBillingHistory}
        paymentDetails={mockPaymentDetails}
        subscription={subscription}
      />
      <SecurityModal />
      <UpgradeModal />
      <WebhookModal />
      <Toaster />
    </div>
  );
}
