import React, { useState } from 'react';
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogPortal
} from '@radix-ui/react-dialog'; // Radix UI Dialog components
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

const socialMediaPlatforms = ['twitter', 'instagram', 'linkedin'];
const allChannels = ['phone', 'email', 'facebook', 'instagram', 'linkedin'];

interface ChannelSelectionModalProps {
  closeModal: () => void;
  handleNext: () => void;
  primaryChannel: string;
  secondaryChannel: string;
  setPrimaryChannel: (channel: string) => void;
  setSecondaryChannel: (channel: string) => void;
}

// Step 1 Modal: Channel Selection
const ChannelSelectionModal: React.FC<ChannelSelectionModalProps> = ({
  closeModal,
  handleNext,
  primaryChannel,
  secondaryChannel,
  setPrimaryChannel,
  setSecondaryChannel
}) => {
  const isSocialMedia = (channel: string) =>
    socialMediaPlatforms.includes(channel);

  // Filter out the primary channel from the secondary channel options
  const filteredSecondaryChannels = allChannels.filter(
    (channel) => channel !== primaryChannel
  );

  // Update handleNext to check if both channels are social media platforms or the same channel
  const validateChannels = () => {
    if (!primaryChannel || !secondaryChannel) {
      return false; // Ensure both primary and secondary channels are selected
    }
    if (isSocialMedia(primaryChannel) && isSocialMedia(secondaryChannel)) {
      alert(
        'Primary and secondary channels cannot both be social media platforms.'
      );
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateChannels()) {
      handleNext();
    }
  };

  return (
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
            <SelectItem
              className="cursor-pointer"
              key={channel}
              value={channel}
            >
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
          {filteredSecondaryChannels.map((channel) => (
            <SelectItem
              className="cursor-pointer"
              key={channel}
              value={channel}
            >
              {channel.charAt(0).toUpperCase() + channel.slice(1)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Button to proceed to the next step */}
      <Button
        onClick={handleNextStep}
        disabled={!primaryChannel || !secondaryChannel}
        className={`mt-4 w-full ${
          !primaryChannel || !secondaryChannel
            ? 'cursor-not-allowed bg-gray-600'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Next
      </Button>
    </div>
  );
};
interface ChannelCustomizationModalProps {
  primaryChannel: string;
  secondaryChannel: string;
  handleNext: () => void;
  handleBack: () => void;
  phoneNumber?: string | null; // Optional prop for phone number
  email?: string | null; // Optional prop for email
  socialAccounts?: string[]; // List of connected social media accounts
  onConnectAccount?: (platform: string) => void; // Function to connect a new account
}
// Step 2 Modal: Channel Customization
const ChannelCustomizationModal: React.FC<ChannelCustomizationModalProps> = ({
  primaryChannel,
  secondaryChannel,
  handleNext,
  handleBack,
  phoneNumber = null,
  email = null,
  socialAccounts = [],
  onConnectAccount
}) => {
  const [inputPhoneNumber, setInputPhoneNumber] = useState<string>(
    phoneNumber || ''
  );
  const [inputEmail, setInputEmail] = useState<string>(email || '');
  const [selectedPrimaryAccount, setSelectedPrimaryAccount] =
    useState<string>('');
  const [selectedSecondaryAccount, setSelectedSecondaryAccount] =
    useState<string>('');
  const [selectedActions, setSelectedActions] = useState<string[]>([]);

  // Phone number input restriction to exactly 11 characters (with '+1' country code)
  // Phone number input restriction to exactly 11 characters (with '+1' country code)
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Ensure the input always starts with '+1' if not provided
    if (!value.startsWith('+1')) {
      value = '+1' + value.replace(/[^\d]/g, ''); // Remove non-digits and prepend '+1'
    } else {
      value = value.replace(/[^\d]/g, ''); // Remove non-digit characters except '+'
      value = '+1' + value.slice(1); // Ensure it keeps the '+1' prefix and allows digits after it
    }

    // Limit input to 12 characters: '+1' (2 chars) + 10 digits
    if (value.length > 12) {
      value = value.slice(0, 12);
    }

    setInputPhoneNumber(value);
  };

  // Email validation
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputEmail(value);
  };

  // Basic email validation
  const isEmailValid = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Handle checkbox change for social media actions
  const handleActionChange = (action: string) => {
    setSelectedActions((prev) =>
      prev.includes(action)
        ? prev.filter((a) => a !== action)
        : [...prev, action]
    );
  };

  // Render customization options based on the channel type
  const renderCustomization = (
    channel: string,
    channelType: 'primary' | 'secondary'
  ) => {
    switch (channel) {
      case 'phone':
        return (
          <>
            <label className="mb-1 block text-sm dark:text-white">
              {channelType === 'primary' ? 'Primary' : 'Secondary'} Phone Number
            </label>
            <Input
              value={inputPhoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder="Enter phone number"
              className="mb-4 w-full"
              type="text"
              maxLength={11} // Ensure maximum length of 11 characters
            />
          </>
        );

      case 'email':
        return (
          <>
            <label className="mb-1 block text-sm dark:text-white">
              {channelType === 'primary' ? 'Primary' : 'Secondary'} Email
              Address
            </label>
            <Input
              value={inputEmail}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="mb-4 w-full"
              type="email"
            />
            {!isEmailValid(inputEmail) && inputEmail && (
              <p className="text-red-500">
                Please enter a valid email address.
              </p>
            )}
          </>
        );

      default:
        return (
          <>
            <label className="mb-1 block text-sm dark:text-white">
              {channelType === 'primary' ? 'Primary' : 'Secondary'}{' '}
              {channel.charAt(0).toUpperCase() + channel.slice(1)} Account
            </label>
            {socialAccounts.length > 0 ? (
              <Select
                onValueChange={
                  channelType === 'primary'
                    ? setSelectedPrimaryAccount
                    : setSelectedSecondaryAccount
                }
              >
                <SelectTrigger className="mb-4 w-full rounded-md bg-gray-800 p-2 text-white">
                  <SelectValue placeholder="Choose an account" />
                </SelectTrigger>
                <SelectContent>
                  {socialAccounts.map((account, index) => (
                    <SelectItem key={index} value={account}>
                      {account}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Button
                onClick={() => onConnectAccount && onConnectAccount(channel)}
                className="mb-4 w-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Connect {channel.charAt(0).toUpperCase() + channel.slice(1)}{' '}
                Account
              </Button>
            )}

            {/* Horizontal checkboxes for actions */}
            <div className="mt-4 flex justify-between space-x-2">
              {['Comment', 'Like', '👁️ Story', 'Follow'].map((action) => (
                <label key={action} className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    checked={selectedActions.includes(action)}
                    onChange={() => handleActionChange(action)}
                    className="form-checkbox"
                  />
                  <span className="text-white">{action}</span>
                </label>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold dark:text-white">
        Customize your Channels
      </h2>

      {/* Primary Channel Customization */}
      <div className="mb-6">
        <h3 className="text-md font-semibold dark:text-white">
          Primary Channel
        </h3>
        {renderCustomization(primaryChannel, 'primary')}
      </div>

      {/* Secondary Channel Customization */}
      <div>
        <h3 className="text-md font-semibold dark:text-white">
          Secondary Channel
        </h3>
        {renderCustomization(secondaryChannel, 'secondary')}
      </div>

      {/* Next and Back Buttons */}
      <Button onClick={handleNext} className="mt-4 w-full">
        Next
      </Button>
      <Button onClick={handleBack} className="mt-2 w-full">
        Back
      </Button>
    </div>
  );
};

// Define types for the props
interface FinalizeCampaignModalProps {
  campaignName: string;
  setCampaignName: (name: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  handleLaunch: () => void;
  handleBack: () => void;
}

// Step 3 Modal: Finalize Campaign
const FinalizeCampaignModal: React.FC<FinalizeCampaignModalProps> = ({
  campaignName,
  setCampaignName,
  startDate,
  setStartDate,
  handleLaunch,
  handleBack
}) => {
  return (
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
      <label className="mb-1 block text-sm dark:text-white">Start Date</label>
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
  );
};

// Main Component
const MultiStepCampaign: React.FC<{ closeModal: () => void }> = ({
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
    closeModal();
  };

  return (
    <Dialog open onOpenChange={closeModal}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 z-40 bg-black bg-opacity-50" />
        <DialogContent className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-md rounded-md bg-white p-6 shadow-lg dark:bg-gray-900">
            <button onClick={closeModal} className="absolute right-4 top-4">
              <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>

            {step === 1 && (
              <ChannelSelectionModal
                closeModal={closeModal}
                handleNext={handleNext}
                primaryChannel={primaryChannel}
                secondaryChannel={secondaryChannel}
                setPrimaryChannel={setPrimaryChannel}
                setSecondaryChannel={setSecondaryChannel}
              />
            )}

            {step === 2 && (
              <ChannelCustomizationModal
                primaryChannel={primaryChannel || ''} // Default to empty string if null
                secondaryChannel={secondaryChannel || ''} // Default to empty string if null
                handleNext={handleNext}
                handleBack={handleBack}
              />
            )}

            {step === 3 && (
              <FinalizeCampaignModal
                campaignName={campaignName}
                setCampaignName={setCampaignName}
                startDate={startDate}
                setStartDate={setStartDate}
                handleLaunch={handleLaunch}
                handleBack={handleBack}
              />
            )}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default MultiStepCampaign;
