'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useModalStore } from '@/lib/stores/dashboard';
import { UserProfileSubscription } from '@/types/_faker/profile/userSubscription';
import { downloadBillingHistoryAsXlsx } from '@/lib/utils/files/billingHistory';
import { PaymentModal } from './paymentDetailts';

// Mocked Data Example: Billing History and Payment Details Props
interface BillingHistoryItem {
  invoice: string;
  amount: string;
  date: string;
  status: string;
}

interface PaymentDetails {
  cardType: string;
  cardLastFour: string;
  expiry: string;
}

interface BillingModalProps {
  billingHistory: BillingHistoryItem[];
  paymentDetails: PaymentDetails;
  subscription: UserProfileSubscription;
}

interface ManageSubscriptionModalProps {
  subscription: UserProfileSubscription; // Accepts the subscription prop
}
const ManageSubscriptionModal: React.FC<ManageSubscriptionModalProps> = ({
  subscription
}) => {
  const {
    isSubscriptionModalOpen,
    openSubscriptionModal,
    closeSubscriptionModal
  } = useModalStore();

  // State to track the subscription status
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(
    subscription.status === 'active'
  );

  // State to track if the subscription is monthly or yearly
  const [subscriptionType, setSubscriptionType] = useState<
    'monthly' | 'yearly'
  >(subscription.type);

  // Function to switch subscription to yearly
  const switchToYearly = () => {
    setSubscriptionType('yearly');
  };

  // Function to cancel the subscription
  const cancelSubscription = () => {
    setIsSubscriptionActive(false);
    setSubscriptionType('monthly'); // Reset to monthly by default after canceling
  };

  return (
    <>
      <Button
        onClick={openSubscriptionModal}
        className="bg-blue-600 text-white"
      >
        Manage Subscription
      </Button>

      {isSubscriptionModalOpen && (
        <Dialog
          open={isSubscriptionModalOpen}
          onOpenChange={closeSubscriptionModal}
        >
          {/* Add styles to the modal for light/dark mode */}
          <DialogContent
            className="border-2 border-orange-700 sm:max-w-lg dark:border-green-400"
            style={{ zIndex: 10000 }}
          >
            <DialogHeader>
              <DialogTitle>Manage your subscription</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              {/* Subscription Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">
                    {subscription.name} Subscription
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {isSubscriptionActive
                      ? 'Active Subscription'
                      : 'No Active Subscription'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Renews: {subscription.renewalDate}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Price: ${subscription.price} / {subscriptionType}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    AI Credits: {subscription.aiCredits}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Leads: {subscription.leads}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Skip Traces: {subscription.skipTraces}
                  </p>
                </div>

                {/* Render different button if subscription is inactive */}
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
                        className="whitespace-nowrap rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
                      >
                        Switch to Yearly and Save
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <Separator />

              {/* Additional Plan Details */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Plan Details: {subscription.planDetails}
                  </p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

// Billing Modal Component
export const BillingModal: React.FC<BillingModalProps> = ({
  billingHistory,
  paymentDetails,
  subscription
}) => {
  const { isBillingModalOpen, openBillingModal, closeBillingModal } =
    useModalStore();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const openPaymentModal = () => setIsPaymentModalOpen(true);
  const closePaymentModal = () => setIsPaymentModalOpen(false);

  return (
    <>
      {isBillingModalOpen && (
        <Dialog open={isBillingModalOpen} onOpenChange={closeBillingModal}>
          <DialogContent className="sm:max-w-lg" style={{ zIndex: 9999 }}>
            <DialogHeader>
              <DialogTitle>Manage your billing</DialogTitle>
            </DialogHeader>

            {/* Payment Methods Section */}
            <div className="mt-4">
              <h3 className="text-lg font-medium">Payment Methods</h3>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {paymentDetails.cardType} ending in{' '}
                    {paymentDetails.cardLastFour}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Expiry {paymentDetails.expiry}
                  </p>
                </div>
                <ManageSubscriptionModal subscription={subscription} />
              </div>
              <Button
                onClick={openPaymentModal}
                variant="link"
                className="mt-4 p-0 text-blue-600"
              >
                + Add new payment method
              </Button>
            </div>

            {/* Billing History Section */}
            <div className="mt-6">
              <h3 className="text-lg font-medium">Billing History</h3>
              <Separator className="my-2" />
              <div className="grid grid-cols-4 gap-2 border-b pb-2 text-sm font-semibold text-muted-foreground">
                <div>Invoice</div>
                <div>Amount</div>
                <div>Date</div>
                <div>Status</div>
              </div>

              {billingHistory.map((entry, index) => (
                <div
                  key={index}
                  className="mt-2 grid grid-cols-4 items-center gap-2 border-b py-2 text-sm"
                >
                  <div>{entry.invoice}</div>
                  <div>{entry.amount}</div>
                  <div>{entry.date}</div>
                  <div className="flex items-center">
                    <Badge className="bg-green-100 text-green-700">
                      {entry.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            {/* Download All Button */}
            <Button
              onClick={() => downloadBillingHistoryAsXlsx(billingHistory)}
              variant="secondary"
              className="mt-4 w-full"
            >
              Download all
            </Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Render PaymentModal if open */}
      {isPaymentModalOpen && (
        <PaymentModal closePaymentModal={closePaymentModal} />
      )}
    </>
  );
};
