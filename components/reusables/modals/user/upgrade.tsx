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

// 1. UpgradeButton Component (handles the button logic)
interface UpgradeButtonProps {
  currentMembership: UserProfileSubscription;
}

export const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  currentMembership
}) => {
  const { openUpgradeModal } = useModalStore();

  // Render "Upgrade now" button if currentMembership is 'basic'
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

  // If the user is already upgraded, return null (no button is displayed)
  return null;
};

// 2. UpgradeModal Component (handles the modal logic)
export const UpgradeModal: React.FC = () => {
  const { isUpgradeModalOpen, closeUpgradeModal } = useModalStore();

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M12 0c-.737 0-1.474.139-2.178.414-3.114 1.22-5.304 4.408-5.938 7.533-.252 1.186-.263 2.388-.052 3.574l.002.009c.03.152.072.299.113.449l.019.063c.141.489.26.933.406 1.374 1.403 4.125 5.447 6.615 9.682 6.615h.002c1.764 0 3.492-.428 5.016-1.242 1.488-.788 2.758-1.975 3.692-3.397 2.151-3.237 2.151-7.785 0-11.023C18.486 1.815 15.325-.005 12 .005z" />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v10c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-10c0-2.761-2.239-5-5-5z" />
                  </svg>
                </span>
                <h4 className="font-medium">Human vs AI Leads.</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                OttoLeads AI can do in one day what takes humans 3 years of
                dialing. Focus on closing deals and let us handle the heavy
                lifting.
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Pricing Details */}
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-semibold">
              AI Calling - $2595 / month
            </h4>
            <Button className="bg-blue-600 text-white">
              Confirm subscription and pay now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
