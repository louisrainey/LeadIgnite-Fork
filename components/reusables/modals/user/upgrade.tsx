'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useModalStore } from '@/lib/stores/dashboard';
import { UserProfileSubscription } from '@/types/_faker/profile/userSubscription';
import { PhoneCall, UserCheck, TrendingUp } from 'lucide-react';

// 1. UpgradeButton Component (handles the button logic)
interface UpgradeButtonProps {
  currentMembership: UserProfileSubscription;
}

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  currentMembership
}) => {
  const { openUpgradeModal } = useModalStore();

  if (currentMembership.name === 'Basic') {
    return (
      <Button
        onClick={openUpgradeModal}
        className="inline-flex items-center rounded-full border bg-white text-gray-700 hover:bg-gray-100"
      >
        <span className="pr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5 text-yellow-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M12 18.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"
            />
          </svg>
        </span>
        Upgrade now
      </Button>
    );
  }
  return null;
};

// 2. UpgradeModal Component (handles the modal logic)
export const UpgradeModal: React.FC = () => {
  const { isUpgradeModalOpen, closeUpgradeModal } = useModalStore();

  // Array of features for dynamic listing
  const features = [
    '✔ 3 call attempts per number',
    '✔ 2,400 calls per minute',
    '✔ Intelligent conversations',
    '✔ Smart lead summary',
    '✔ Detailed KPIs & stats',
    '✔ Rapid campaign delivery'
  ];

  // Stripe Payment link
  const stripePaymentLink = 'https://buy.stripe.com/test_123456789';

  return (
    <Dialog open={isUpgradeModalOpen} onOpenChange={closeUpgradeModal}>
      <DialogContent
        className="sm:max-w-3xl"
        autoFocus={false}
        style={{ zIndex: 9999 }}
      >
        <DialogHeader>
          <DialogTitle>AI Calling - Upgrade your plan</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <h3 className="text-xl font-semibold">AI-powered leads made easy.</h3>
          <p className="text-sm text-muted-foreground">
            Welcome to the future. Let’s upgrade your business.
          </p>
          <Separator className="my-4" />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <div className="mb-2 flex items-center">
                <span className="mr-2 text-blue-500">
                  <PhoneCall className="h-5 w-5" />
                </span>
                <h4 className="font-medium">
                  Calling powered by artificial intelligence.
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Our AI technology allows for natural phrasing and dynamic
                engagements using human-like voice models. Advanced calling
                algorithms ensure optimal results and quality leads.
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center">
                <span className="mr-2 text-blue-500">
                  <UserCheck className="h-5 w-5" />
                </span>
                <h4 className="font-medium">Human vs OttoLeads.</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                It takes a human on a dialer 3 years to do what OttoLeads can do
                in one day. Let us do the heavy lifting while you focus on
                closing deals.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center">
              <span className="mr-2 text-blue-500">
                <TrendingUp className="h-5 w-5" />
              </span>
              <h4 className="font-medium">
                Scale rapidly and dominate your market.
              </h4>
            </div>
            <p className="text-sm text-muted-foreground">
              Scaling your business used to take years; with OttoLeads, you can
              scale in months.
            </p>
          </div>

          <Separator className="my-4" />

          {/* Pricing Details */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm">CREDITS / month</p>
              <p className="text-sm text-muted-foreground">
                1 credit = 1 property record
              </p>
              {/* Dynamic list rendering */}
              <ul className="mt-2 space-y-1 text-sm">
                {features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold">$1795 / month</h4>
              <p className="text-sm text-muted-foreground">
                $1,795.00 / month after
              </p>
              <Button
                className="mt-4 bg-blue-600 text-white"
                onClick={() => window.open(stripePaymentLink, '_blank')}
              >
                Confirm subscription and pay now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
