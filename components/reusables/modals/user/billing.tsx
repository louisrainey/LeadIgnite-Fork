'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useModalStore } from '@/lib/stores/dashboard';
import { UserProfileSubscription } from '@/types/_faker/profile/userSubscription';
import { downloadBillingHistoryAsXlsx } from '@/lib/utils/files/billingHistory';
import { PaymentModal } from './paymentDetailts';
import {
  BillingHistoryItem,
  PaymentDetails
} from '@/types/_faker/profile/userData';

// Modal Props
interface BillingModalProps {
  billingHistory: BillingHistoryItem[];
  paymentDetails: PaymentDetails;
  subscription: UserProfileSubscription;
}

interface ManageSubscriptionModalProps {
  subscription: UserProfileSubscription;
}

// Custom Modal Component
const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ isOpen, onClose, children }) => {
  // Prevent background scroll when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
};

// Manage Subscription Modal
const ManageSubscriptionModal: React.FC<ManageSubscriptionModalProps> = ({
  subscription
}) => {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(
    subscription.status === 'active'
  );
  const [subscriptionType, setSubscriptionType] = useState<
    'monthly' | 'yearly'
  >(subscription.type);

  const switchToYearly = () => setSubscriptionType('yearly');
  const cancelSubscription = () => {
    setIsSubscriptionActive(false);
    setSubscriptionType('monthly');
  };

  const openSubscriptionModal = () => setIsSubscriptionModalOpen(true);
  const closeSubscriptionModal = () => setIsSubscriptionModalOpen(false);

  return (
    <>
      <Button
        onClick={openSubscriptionModal}
        className="bg-blue-600 text-white"
      >
        Manage Subscription
      </Button>

      <Modal isOpen={isSubscriptionModalOpen} onClose={closeSubscriptionModal}>
        <div className="space-y-4 dark:text-gray-300">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium dark:text-gray-200">
                {subscription.name} Subscription
              </h4>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                {isSubscriptionActive
                  ? 'Active Subscription'
                  : 'No Active Subscription'}
              </p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Renews: {subscription.renewalDate}
              </p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Price: ${subscription.price} / {subscriptionType}
              </p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                AI Credits: {subscription.aiCredits}
              </p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Leads: {subscription.leads}
              </p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Skip Traces: {subscription.skipTraces}
              </p>
            </div>

            {!isSubscriptionActive ? (
              <Button className="bg-blue-600 text-white">
                Buy Subscription
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={cancelSubscription}>
                  Cancel
                </Button>
                {subscriptionType === 'monthly' && (
                  <Button
                    onClick={switchToYearly}
                    className="whitespace-nowrap bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                  >
                    Switch to Yearly and Save
                  </Button>
                )}
              </div>
            )}
          </div>

          <Separator className="dark:border-gray-600" />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Plan Details: {subscription.planDetails}
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

// Billing Modal Component
export const BillingModal: React.FC<BillingModalProps> = ({
  billingHistory,
  paymentDetails,
  subscription
}) => {
  const { isBillingModalOpen, closeBillingModal } = useModalStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  return (
    <>
      <Modal isOpen={isBillingModalOpen} onClose={closeBillingModal}>
        <div className="mt-4 dark:text-gray-300">
          <h3 className="text-lg font-medium dark:text-gray-200">
            Payment Methods
          </h3>
          <Separator className="my-2 dark:border-gray-600" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium dark:text-gray-300">
                {paymentDetails.cardType} ending in{' '}
                {paymentDetails.cardLastFour}
              </p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Expiry {paymentDetails.expiry}
              </p>
            </div>
            <ManageSubscriptionModal subscription={subscription} />
          </div>

          <Button
            onClick={openPaymentModal}
            variant="link"
            className="mt-4 p-0 text-blue-600 dark:text-blue-400"
          >
            + Add new payment method
          </Button>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium dark:text-gray-200">
            Billing History
          </h3>
          <Separator className="my-2 dark:border-gray-600" />
          <div className="grid grid-cols-4 gap-2 border-b pb-2 text-sm font-semibold text-muted-foreground dark:text-gray-400">
            <div>Invoice</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Status</div>
          </div>

          {billingHistory.map((entry, index) => (
            <div
              key={index}
              className="mt-2 grid grid-cols-4 items-center gap-2 border-b py-2 text-sm dark:border-gray-700"
            >
              <div>{entry.invoice}</div>
              <div>{entry.amount}</div>
              <div>{entry.date.toLocaleDateString()}</div>
              <div className="flex items-center">
                <Badge
                  className={
                    entry.status === 'Unpaid'
                      ? 'bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-100'
                      : 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-100'
                  }
                >
                  {entry.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={() => downloadBillingHistoryAsXlsx(billingHistory)}
          variant="secondary"
          className="mt-4 w-full"
        >
          Download all
        </Button>
      </Modal>

      {isPaymentModalOpen && (
        <PaymentModal closePaymentModal={closePaymentModal} />
      )}
    </>
  );
};
