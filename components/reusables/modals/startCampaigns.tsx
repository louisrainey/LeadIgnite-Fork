import React, { useState } from 'react';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogPortal
} from '@radix-ui/react-dialog'; // Radix UI Dialog components for modal
import { Button } from '@/components/ui/button'; // ShadCN Button
import { Input } from '@/components/ui/input'; // ShadCN Input
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '@/components/ui/select'; // ShadCN Select
import { X } from 'lucide-react'; // Close Icon

interface MultiStepCampaignProps {
  closeModal: () => void; // Correctly typed closeModal prop
}

const socialMediaPlatforms = ['facebook', 'instagram', 'linkedin'];
const allChannels = ['phone', 'email', 'facebook', 'instagram', 'linkedin'];

const MultiStepCampaign: React.FC<MultiStepCampaignProps> = ({
  closeModal
}) => {
  const [step, setStep] = useState(1);
  const [primaryChannel, setPrimaryChannel] = useState<string>('');
  const [secondaryChannel, setSecondaryChannel] = useState<string>('');
  const [campaignName, setCampaignName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');

  const isSocialMedia = (channel: string) =>
    socialMediaPlatforms.includes(channel);

  const handleNext = () => {
    // Check if both primary and secondary channels are social media platforms
    if (isSocialMedia(primaryChannel) && isSocialMedia(secondaryChannel)) {
      alert(
        'Primary and secondary channels cannot both be social media platforms.'
      );
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);
  const handleLaunch = () => {
    alert(`Campaign "${campaignName}" launched!`);
    closeModal(); // Close modal after launching the campaign
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      {/* DialogPortal ensures modal is rendered at the root level */}
      <DialogPortal>
        {/* Dialog Overlay to handle outside click */}
        <DialogOverlay className="fixed inset-0 z-40 bg-black bg-opacity-50" />

        {/* Dialog Content */}
        <DialogContent className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-md bg-white p-6 shadow-lg dark:bg-gray-900">
            {/* Close Button */}
            <button onClick={closeModal} className="absolute right-4 top-4">
              <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>

            {step === 1 && (
              <div>
                <h2 className="mb-4 text-center text-lg font-semibold dark:text-white">
                  Select Communication Channels
                </h2>
                <p className="mb-4 text-center text-gray-500 dark:text-gray-400">
                  Choose primary and secondary channels
                </p>

                {/* Primary Channel Select */}
                <label className="mb-2 block text-sm font-semibold dark:text-gray-200">
                  Primary Channel
                </label>
                <Select onValueChange={setPrimaryChannel}>
                  <SelectTrigger className="mb-4 w-full rounded-md bg-gray-800 p-2 text-white">
                    <SelectValue placeholder="Choose a primary channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {allChannels.map((channel) => (
                      <SelectItem key={channel} value={channel}>
                        {channel.charAt(0).toUpperCase() + channel.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Secondary Channel Select */}
                <label className="mb-2 block text-sm font-semibold dark:text-gray-200">
                  Secondary Channel
                </label>
                <Select onValueChange={setSecondaryChannel}>
                  <SelectTrigger className="mb-4 w-full rounded-md bg-gray-800 p-2 text-white">
                    <SelectValue placeholder="Choose a secondary channel" />
                  </SelectTrigger>
                  <SelectContent>
                    {allChannels.map((channel) => (
                      <SelectItem key={channel} value={channel}>
                        {channel.charAt(0).toUpperCase() + channel.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  onClick={handleNext}
                  disabled={!primaryChannel || !secondaryChannel} // Disable if channels are not selected
                  className={`mt-4 w-full ${
                    !primaryChannel || !secondaryChannel
                      ? 'cursor-not-allowed bg-gray-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Next
                </Button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="mb-4 text-lg font-semibold dark:text-white">
                  Customize your {primaryChannel}
                </h2>
                {primaryChannel === 'phone' && (
                  <>
                    <label className="mb-1 block text-sm dark:text-white">
                      Callback phone number
                    </label>
                    <Input
                      placeholder="Enter phone number"
                      className="mb-4 w-full"
                    />
                  </>
                )}
                {primaryChannel === 'email' && (
                  <>
                    <label className="mb-1 block text-sm dark:text-white">
                      Email Address
                    </label>
                    <Input
                      placeholder="Enter your email"
                      className="mb-4 w-full"
                    />
                  </>
                )}
                <Button onClick={handleNext} className="mt-4 w-full">
                  Next
                </Button>
                <Button onClick={handleBack} className="mt-2 w-full">
                  Back
                </Button>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="mb-4 text-lg font-semibold dark:text-white">
                  Finalize your campaign
                </h2>
                <label className="mb-1 block text-sm dark:text-white">
                  Campaign Name
                </label>
                <Input
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Enter campaign name"
                  className="mb-4 w-full"
                />
                <label className="mb-1 block text-sm dark:text-white">
                  Start Date
                </label>
                <Input
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="MM/DD/YYYY"
                  className="mb-4 w-full"
                />
                <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                  This campaign will cost 2192 credits.
                </p>
                <Button onClick={handleLaunch} className="w-full">
                  Launch Campaign
                </Button>
                <Button onClick={handleBack} className="mt-2 w-full">
                  Back
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default MultiStepCampaign;
