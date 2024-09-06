import React, { useState } from 'react';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogClose,
  DialogPortal
} from '@radix-ui/react-dialog'; // Radix UI Dialog components
import { Button } from '@/components/ui/button'; // ShadCN Button
import { Input } from '@/components/ui/input'; // ShadCN Input
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent
} from '@radix-ui/react-select'; // Radix UI Select
import { X } from 'lucide-react'; // Close Icon

interface MultiStepCampaignProps {
  closeModal: () => void; // Correctly typed closeModal prop
}

const MultiStepCampaign: React.FC<MultiStepCampaignProps> = ({
  closeModal
}) => {
  const [step, setStep] = useState(1);
  const [selectedChannel, setSelectedChannel] = useState<string>('');
  const [campaignName, setCampaignName] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');

  const handleNext = () => setStep(step + 1);
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
                <h2 className="mb-4 text-lg font-semibold">
                  Select Communication Channel
                </h2>
                <Select onValueChange={setSelectedChannel}>
                  <SelectTrigger className="mb-4 w-full p-2">
                    {selectedChannel || 'Choose a channel'}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="phone">Phone Number</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleNext} className="mt-4 w-full">
                  Next
                </Button>
              </div>
            )}

            {step === 2 && selectedChannel && (
              <div>
                <h2 className="mb-4 text-lg font-semibold">
                  Customize your {selectedChannel}
                </h2>
                {selectedChannel === 'phone' && (
                  <>
                    <label className="mb-1 block text-sm">
                      Callback phone number
                    </label>
                    <Input
                      placeholder="Enter phone number"
                      className="mb-4 w-full"
                    />
                  </>
                )}
                {selectedChannel === 'email' && (
                  <>
                    <label className="mb-1 block text-sm">Email Address</label>
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
                <h2 className="mb-4 text-lg font-semibold">
                  Finalize your campaign
                </h2>
                <label className="mb-1 block text-sm">Campaign Name</label>
                <Input
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Enter campaign name"
                  className="mb-4 w-full"
                />
                <label className="mb-1 block text-sm">Start Date</label>
                <Input
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="MM/DD/YYYY"
                  className="mb-4 w-full"
                />
                <p className="mb-4 text-sm text-gray-500">
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
