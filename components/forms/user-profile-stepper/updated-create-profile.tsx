'use client';
import {
  InstagramLoginButton,
  FacebookLoginButton,
  TwitterLoginButton,
  LinkedInLoginButton
} from 'react-social-login-buttons';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import {
  profileSchema,
  type ProfileFormValues
} from '@/types/zod/userSetup/profile-form-schema';
import { cn } from '@/lib/utils/kanban/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { HelpCircle, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import VoiceSelector from './utils/voice/selector';
import { mockVoices } from '@/constants/_faker/_api/vapi/assistant';
import { UploadEmailBody } from './utils/voice/uploadEmailBody';
import UploadSalesScript from './utils/voice/uploadScript';
import { campaignSteps } from '@/_tests/tours/campaignTour';
import PropertySearchModal from '@/components/reusables/tutorials/walkthroughModal';
import { Switch } from '@/components/ui/switch';
import { DynamicFileUpload } from './utils/files/dynamicUploadFiles';
import DynamicCloningModal from './utils/voice/dynamicVoiceRecord';
import HashtagInput from './utils/socials/hashtags';

const twoFactorAuthOptions = [
  { name: 'twoFactoAuth.sms', label: 'SMS' },
  { name: 'twoFactoAuth.email', label: 'Email ' },
  { name: 'twoFactoAuth.authenticatorApp', label: 'Authenticator App' }
];

const notificationOptions = [
  { name: 'notifications.emailNotifications', label: 'Email ' },
  { name: 'notifications.smsNotifications', label: 'SMS' },
  { name: 'notifications.notifyForNewLeads', label: 'New Leads' },
  { name: 'notifications.notifyForCampaignUpdates', label: 'Campaign Updates' }
];
interface ProfileFormType {
  initialData: any | null;
  categories: any;
}

// 1. Profile Heading Component
const ProfileHeading: React.FC<{
  title: string;
  description: string;
  loading: boolean;
  onDelete: () => void;
  showDeleteButton: boolean;
}> = ({ title, description, loading, onDelete, showDeleteButton }) => (
  <div className="flex flex-col items-center justify-between text-center sm:flex-row sm:text-left">
    <Heading title={title} description={description} />
    {showDeleteButton && (
      <Button
        disabled={loading}
        variant="destructive"
        size="sm"
        onClick={onDelete}
        className="mt-2 sm:mt-0"
      >
        <Trash className="h-4 w-4" />
      </Button>
    )}
  </div>
);

// 2. Personal Information Form Component
// 2. Personal Information Form Component
const PersonalInformationForm: React.FC<{
  form: any;
  loading: boolean;
  countries: { id: string; name: string }[];
  cities: { id: string; name: string }[];
}> = ({ form, loading, countries, cities }) => (
  <>
    <FormField
      control={form.control}
      name="firstName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input disabled={loading} placeholder="John" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="lastName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input disabled={loading} placeholder="Doe" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              disabled={loading}
              placeholder="johndoe@gmail.com"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="personalNum"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Personal Phone Number</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter your phone number"
              disabled={loading}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="city"
      render={({ field }) => (
        <FormItem>
          <FormLabel>City</FormLabel>
          <Select
            disabled={loading}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  defaultValue={field.value}
                  placeholder="Select a city"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
    <FormField
      control={form.control}
      name="country"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Country</FormLabel>
          <Select
            disabled={loading}
            onValueChange={field.onChange}
            value={field.value}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  defaultValue={field.value}
                  placeholder="Select a country"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.id}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Two-Factor Authentication (2FA) Section */}
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Two-Factor Authentication (2FA)</h3>
      <div className="space-y-4">
        {' '}
        {/* Changed from grid to vertical stack */}
        {twoFactorAuthOptions.map((option) => (
          <FormField
            key={option.name}
            control={form.control}
            name={option.name}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between space-x-4">
                  <FormLabel className="flex-shrink-0">
                    {option.label}
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>

    {/* Notifications Section */}
    <div className=" space-y-4">
      <h3 className="text-lg font-medium">Notifications</h3>
      <div className="space-y-4">
        {' '}
        {/* Changed from grid to vertical stack */}
        {notificationOptions.map((option) => (
          <FormField
            key={option.name}
            control={form.control}
            name={option.name}
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between space-x-4">
                  <FormLabel className="flex-shrink-0">
                    {option.label}
                  </FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={loading}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
      </div>
    </div>
  </>
);
// 3. BaseSetup Component

const BaseSetup: React.FC<{
  form: any;
  loading: boolean;

  voices: AssistantVoice[]; // Add voices prop for VoiceSelector
  handleVoiceSelect: (voiceId: string) => void; // Voice select handler
  handleScriptUpload: (scriptContent: string) => void; // Script upload handler
  selectedScriptFileName: string; // Selected script file name
  handleEmailUpload: (emailContent: string) => void; // Email upload handler
  selectedEmailFileName: string; // Selected email file name
}> = ({ form, loading }) => {
  // Handle file uploads for images
  const handleFilesUpload = (uploadedFiles: File[]) => {
    // Process the uploaded files and update the form field for `companyAssets`
    console.log('Uploaded image files:', uploadedFiles);

    // Use form.setValue to update the `companyAssets` field with the uploaded files
    form.setValue('companyAssets', uploadedFiles);
  };

  // Handle company explainer video upload

  return (
    <>
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company name</FormLabel>
            <FormControl>
              <Input disabled={loading} placeholder="Apex Company" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="companyLogo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Logo</FormLabel>
            <FormControl>
              <input
                type="file"
                accept="image/*"
                disabled={loading}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    field.onChange(file); // Handle the file input here
                  }
                }}
                className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="outreachEmailAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Outreach Email</FormLabel>
            <FormControl>
              <Input
                disabled={loading}
                placeholder="johndoe@gmail.com"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="leadForwardingNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Forwarding Phone Number</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Enter your phone number"
                disabled={loading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Company Explainer Video Upload */}
      <FormField
        control={form.control}
        name="companyExplainerVideoUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Explainer Video URL</FormLabel>
            <FormControl>
              <Input
                type="url" // Change input type to 'url' for URL validation
                disabled={loading}
                placeholder="https://example.com/video"
                {...field} // Bind the field to the form state
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-4 md:text-center">
        <FormField
          control={form.control}
          name="companyAssets"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel>Upload Company Assets</FormLabel>
              <DynamicFileUpload
                onFilesUpload={(files) => field.onChange(files)} // Set form value when files are uploaded
                allowedFileTypes={['jpg', 'jpeg', 'png', 'webp']} // Allow image file types only
                minFiles={3} // Minimum of 3 files required
                maxFiles={12} // Maximum of 12 files allowed
                selectedFiles={field.value} // Set the initial state to selected files from form
              />
              <FormMessage>{error?.message}</FormMessage>{' '}
              {/* Display error message */}
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

const KnowledgeBaseSetup: React.FC<{
  form: any;
  loading: boolean;

  voices: AssistantVoice[]; // Add voices prop for VoiceSelector
  handleVoiceSelect: (voiceId: string) => void; // Voice select handler
  handleScriptUpload: (scriptContent: string) => void; // Script upload handler
  selectedScriptFileName: string; // Selected script file name
  handleEmailUpload: (emailContent: string) => void; // Email upload handler
  selectedEmailFileName: string; // Selected email file name
}> = ({
  form,
  loading,
  voices,
  handleVoiceSelect,
  handleScriptUpload,
  selectedScriptFileName,
  handleEmailUpload,
  selectedEmailFileName
}) => {
  const [showVoiceCloneModal, setShowVoiceCloneModal] = useState(false);
  const [showVoicemailModal, setShowVoicemailModal] = useState(false);

  // Handle voicemail recording logic
  const handleVoicemailRecording = (recordingId: string) => {
    form.setValue('voicemailRecordingId', recordingId); // Store the voicemail recording ID in the form
    setShowVoicemailModal(false); // Close the modal
    console.log('Voicemail recorded with ID:', recordingId);
  };

  // Handle voice clone recording logic
  const handleVoiceCloneRecording = (recordingId: string) => {
    form.setValue('clonedVoiceId', recordingId); // Store the voice clone recording ID in the form
    setShowVoiceCloneModal(false); // Close the modal
    console.log('Voice clone recorded with ID:', recordingId);
  };

  return (
    <>
      {/* Voice Selection Field */}
      <FormField
        control={form.control}
        name="selectedVoice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Select Voice (Optional)</FormLabel>
            <VoiceSelector
              voices={voices}
              onVoiceSelect={(voiceId: string) => {
                field.onChange(voiceId); // Update the form state when a voice is selected
                handleVoiceSelect(voiceId); // Call the original handler to handle side-effects
              }}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Upload Sales Script Field */}
      <FormField
        control={form.control}
        name="exampleSalesScript"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>Upload Sales Script (Optional)</FormLabel>
            <UploadSalesScript
              onFileUpload={(fileContent: string) => {
                field.onChange(fileContent); // Update form state with file content
                handleScriptUpload(fileContent); // Handle file upload
              }}
              selectedFileName={selectedScriptFileName} // Show the selected file name
            />
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Upload Email Body Field */}
      <FormField
        control={form.control}
        name="exampleEmailBody"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>Upload Email Body (Optional)</FormLabel>
            <UploadEmailBody
              onFileUpload={(fileContent: string) => {
                field.onChange(fileContent); // Update form state with file content
                handleEmailUpload(fileContent); // Handle file upload
              }}
              selectedFileName={selectedEmailFileName} // Show the selected file name
            />
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Voicemail Recording Field */}
      <FormField
        control={form.control}
        name="voicemailRecordingId"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>Record Voicemail (1m - 5m)</FormLabel>
            <button
              type="button"
              className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={() => setShowVoicemailModal(true)}
            >
              Record Voicemail
            </button>
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Voice Clone Recording Field */}
      <FormField
        control={form.control}
        name="clonedVoiceId"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>Record Voice Clone (5m - 10m)</FormLabel>
            <button
              type="button"
              className="w-full rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              onClick={() => setShowVoiceCloneModal(true)}
            >
              Record Voice Clone
            </button>
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Voicemail Recording Modal */}
      {showVoicemailModal && (
        <DynamicCloningModal
          onClose={() => setShowVoicemailModal(false)}
          minRecordingLength={60} // 1 minute
          maxRecordingLength={300} // 5 minutes
          onRecordingComplete={handleVoicemailRecording} // Handle completed recording
          scriptText={['Please record your voicemail message.']} // Script for voicemail
        />
      )}

      {/* Voice Clone Recording Modal */}
      {showVoiceCloneModal && (
        <DynamicCloningModal
          onClose={() => setShowVoiceCloneModal(false)}
          minRecordingLength={300} // 5 minutes
          maxRecordingLength={600} // 10 minutes
          onRecordingComplete={handleVoiceCloneRecording} // Handle completed recording
          scriptText={[
            'Please read the following script to clone your voice.',
            'Keep a consistent tone and pace throughout the recording.',
            'The voice clone will generate from this reading.'
          ]} // Script for voice cloning
        />
      )}
    </>
  );
};

const OAuthSetup: React.FC<{
  form: any;
  loading: boolean;
}> = ({ form, loading }) => {
  const [metaData, setMetaData] = useState<any>(null); // Meta (Facebook) OAuth data
  const [instagramData, setInstagramData] = useState<any>(null); // Instagram OAuth data
  const [twitterData, setTwitterData] = useState<any>(null); // Twitter OAuth data
  const [linkedInData, setLinkedInData] = useState<any>(null); // LinkedIn OAuth data

  // Simulate OAuth login flow for different services
  const handleOAuthLogin = (service: string) => {
    const simulatedOAuthData = {
      accessToken: 'abc123',
      refreshToken: 'def456',
      expiresIn: 3600,
      tokenType: 'Bearer',
      scope: 'user_profile'
    };

    switch (service) {
      case 'meta':
        setMetaData(simulatedOAuthData);
        form.setValue('meta', simulatedOAuthData); // Set the form value for Meta (Facebook) OAuth
        break;
      case 'instagram':
        setInstagramData(simulatedOAuthData);
        form.setValue('instagram', simulatedOAuthData); // Set the form value for Instagram OAuth
        break;
      case 'twitter':
        setTwitterData(simulatedOAuthData);
        form.setValue('twitter', simulatedOAuthData); // Set the form value for Twitter OAuth
        break;
      case 'linkedIn':
        setLinkedInData(simulatedOAuthData);
        form.setValue('linkedIn', simulatedOAuthData); // Set the form value for LinkedIn OAuth
        break;
      default:
        break;
    }
  };

  return (
    <>
      {/* Meta (Facebook) OAuth */}
      <FormField
        control={form.control}
        name="meta"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>Meta (Facebook) Login</FormLabel>
            <FacebookLoginButton onClick={() => handleOAuthLogin('meta')} />
            {metaData && (
              <p className="text-sm text-gray-600">
                Access Token: {metaData.accessToken}
              </p>
            )}
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Instagram OAuth */}
      <FormField
        control={form.control}
        name="instagram"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>Instagram Login</FormLabel>
            <InstagramLoginButton
              onClick={() => handleOAuthLogin('instagram')}
            />
            {instagramData && (
              <p className="text-sm text-gray-600">
                Access Token: {instagramData.accessToken}
              </p>
            )}
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Twitter OAuth */}
      <FormField
        control={form.control}
        name="twitter"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>Twitter Login</FormLabel>
            <TwitterLoginButton onClick={() => handleOAuthLogin('twitter')} />
            {twitterData && (
              <p className="text-sm text-gray-600">
                Access Token: {twitterData.accessToken}
              </p>
            )}
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* LinkedIn OAuth */}
      <FormField
        control={form.control}
        name="linkedIn"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            <FormLabel>LinkedIn Login</FormLabel>
            <LinkedInLoginButton onClick={() => handleOAuthLogin('linkedIn')} />
            {linkedInData && (
              <p className="text-sm text-gray-600">
                Access Token: {linkedInData.accessToken}
              </p>
            )}
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        )}
      />

      {/* Hashtag Input */}
      <FormField
        control={form.control}
        name="socialMediatags"
        render={({ field, fieldState: { error } }) => (
          <FormItem>
            {/* Hashtag Input Component */}
            <HashtagInput
              form={form}
              loading={loading}
              minHashtags={5} // Minimum number of hashtags required
              maxHashtags={10} // Maximum number of hashtags allowed
              required={false} // Whether this field is required
            />
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        )}
      />
    </>
  );
};
// 4. Step Navigation Component
const StepNavigation: React.FC<{
  currentStep: number;
  stepsLength: number;
  next: () => void;
  prev: () => void;
  nextDisabled?: boolean;
}> = ({ currentStep, stepsLength, next, prev, nextDisabled = false }) => (
  <div className="mt-8 flex justify-between pt-5">
    {/* Previous Button */}
    <button
      type="button"
      onClick={prev}
      disabled={currentStep === 0}
      className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Previous
    </button>

    {/* Next / Finish & Save Button */}
    <button
      type="button"
      onClick={next}
      disabled={nextDisabled}
      className={`rounded px-4 py-2 text-sm font-semibold shadow-sm transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 
        ${
          currentStep === stepsLength - 1
            ? 'bg-blue-600 text-white'
            : 'bg-white text-sky-900 ring-1 ring-inset ring-sky-300'
        }`}
    >
      {currentStep === stepsLength - 1 ? 'Finish & Save' : 'Next'}
    </button>
  </div>
);

// Main Component

// Main Component

// Main Component
// Main Component
export const CreateProfileUpdated: React.FC<ProfileFormType> = ({
  initialData,
  categories
}) => {
  const params = useParams();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false); // State for help modal visibility
  const [isTourOpen, setIsTourOpen] = useState(false); // State for the tour

  const handleHelpOpenModal = () => setIsHelpModalOpen(true);
  const handleHelpCloseModal = () => setIsHelpModalOpen(false);
  const handleHelpStartTour = () => setIsTourOpen(true);
  const handleHelpCloseTour = () => setIsTourOpen(false);
  const [selectedScriptFileName, setSelectedScriptFileName] =
    useState<string>(''); // Track uploaded file name
  const [selectedEmailFileName, setSelectedEmailFileName] =
    useState<string>(''); // Track uploaded file name

  const title = initialData ? 'Create Profile' : 'Edit Your Profile';
  const description = initialData
    ? 'Create your profile to optimize, your lead generation'
    : 'Edit your profile, change callback number script etc.';
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});

  // const defaultValues = {
  //   jobs: [
  //     {
  //       jobtitle: '',
  //       employer: '',
  //       startdate: '',
  //       enddate: '',
  //       jobcountry: '',
  //       jobcity: ''
  //     }
  //   ]
  // };

  // useForm setup with Zod validation
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    // defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange'
  });
  const {
    control,
    setValue, // Used to set values programmatically for form fields
    formState: { isValid, isSubmitting }
  } = form;

  const steps = [
    {
      id: 'Personal Information',
      name: 'Setup Profile',
      fields: [
        'firstName',
        'lastName',
        'email',
        'personalNum',
        'country',
        'city',
        'twoFactoAuth',
        'notifications'
      ]
    },
    {
      id: 'Upload Company Assets',
      name: 'Setup Your Base',
      fields: [
        'companyName',
        'companyLogo',
        'companyExplainerVideoUrl',
        'companyAssets',
        'outreachEmailAddress',
        'leadForwardingNumber'
      ]
    },
    {
      id: 'Optimize Your Outreach',
      name: 'Setup Ai Knowledgebase',
      fields: [
        'selectedVoice',
        'clonedVoiceId',
        'exampleSalesScript',
        'exampleEmailBody',
        'voicemailRecordingId'
      ]
    },
    {
      id: 'Connect Social Accounts',
      name: 'Setup Tags & Accounts',
      fields: [
        'socialMediaCampaignAccounts.facebook', // Meta (Facebook)
        'socialMediaCampaignAccounts.twitter', // Twitter
        'socialMediaCampaignAccounts.instagram', // Instagram
        'socialMediaCampaignAccounts.linkedIn', // LinkedIn
        'socialMediatags'
      ]
    }
  ];
  const next = async () => {
    console.log('Next button clicked, current step:', currentStep); // Debug log
    const stepFields = steps[currentStep].fields as (keyof ProfileFormValues)[];

    const isStepValid = await form.trigger(stepFields); // Validate current step
    console.log('Step Valid:', isStepValid); // Debug validation

    if (isStepValid) {
      if (currentStep === steps.length - 1) {
        console.log('Submitting form...');
        try {
          // Show alert for successful "form submission"
          window.alert('Form saved successfully!');

          // Redirect to dashboard after "submission"
          router.push('/dashboard');
        } catch (error) {
          // Catch and log any unexpected errors
          console.error('Error during form submission:', error);
          window.alert('An error occurred during form submission.');
        }
      } else {
        console.log('Going to the next step...');
        setCurrentStep((prevStep) => prevStep + 1);
      }
    } else {
      console.log('Step validation failed.');
    }
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((step) => step - 1);
  };

  const countries = [{ id: '1', name: 'India' }];
  const cities = [{ id: '2', name: 'Kerala' }];

  const voices: AssistantVoice[] = mockVoices; // Generate 5 mock voices

  // Handle voice selection (use form.setValue to track selected voice)
  const handleVoiceSelect = (voiceId: string) => {
    form.setValue('selectedVoice', voiceId); // Update form state with selected voice
    console.log('Selected voice:', voiceId);
  };

  // Function to handle file uploads for sales script
  const handleScriptUpload = (fileContent: string) => {
    form.setValue('exampleSalesScript', fileContent); // Update form state with sales script content
    console.log('Uploaded Sales Script Content:', fileContent);
  };

  // Function to handle file uploads for email body
  const handleEmailUpload = (fileContent: string) => {
    form.setValue('exampleEmailBody', fileContent); // Update form state with email body content
    console.log('Uploaded Email Body Content:', fileContent);
  };

  return (
    <>
      <ProfileHeading
        title={title}
        description={description}
        loading={loading}
        onDelete={() => setOpen(true)}
        showDeleteButton={!!initialData}
      />
      <div className="flex items-center justify-center">
        <button
          onClick={() => setIsHelpModalOpen(true)}
          className="animate-bounce rounded-full bg-blue-500 p-2 text-white hover:animate-none dark:bg-green-700 dark:text-gray-300"
        >
          <HelpCircle size={20} />
        </button>
      </div>

      <Separator />
      <div>
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              <div
                className={cn(
                  'group flex w-full flex-col py-2 pl-4',
                  currentStep === index
                    ? 'border-l-4 border-blue-600 text-blue-600' // Current step (active)
                    : currentStep > index
                    ? 'border-l-4 border-green-600 text-green-600' // Completed steps
                    : 'border-l-4 border-gray-200 text-gray-500' // Inactive steps (future)
                )}
              >
                <span className="text-sm font-medium">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      <PropertySearchModal
        isOpen={isHelpModalOpen}
        onClose={handleHelpCloseModal}
        videoUrl="https://www.youtube.com/embed/example-video" // Example YouTube video URL
        title="Welcome to Your Profile Setup"
        subtitle="Learn how to create or edit your profile, optimize your settings, and improve lead generation."
        steps={campaignSteps} // Steps for the tour
        isTourOpen={isTourOpen}
        onStartTour={handleHelpStartTour}
        onCloseTour={handleHelpCloseTour}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => {})}
          className="w-full space-y-8"
        >
          <div
            className={cn(
              currentStep === 1
                ? 'w-full md:inline-block'
                : 'gap-8 md:grid md:grid-cols-3'
            )}
          >
            {currentStep === 0 && (
              <PersonalInformationForm
                form={form}
                loading={loading}
                countries={countries}
                cities={cities}
              />
            )}

            {currentStep === 1 && (
              <BaseSetup
                form={form}
                loading={loading}
                voices={voices} // Pass the voices prop for VoiceSelector
                handleVoiceSelect={handleVoiceSelect} // Pass the handler for voice selection
                handleScriptUpload={handleScriptUpload} // Pass the handler for script upload
                selectedScriptFileName={selectedScriptFileName} // Pass the selected script file name
                handleEmailUpload={handleEmailUpload} // Pass the handler for email upload
                selectedEmailFileName={selectedEmailFileName} // Pass the selected email file name
              />
            )}
            {currentStep === 2 && (
              <KnowledgeBaseSetup
                form={form}
                loading={loading}
                voices={voices} // Pass the voices prop for VoiceSelector
                handleVoiceSelect={handleVoiceSelect} // Pass the handler for voice selection
                handleScriptUpload={handleScriptUpload} // Pass the handler for script upload
                selectedScriptFileName={selectedScriptFileName} // Pass the selected script file name
                handleEmailUpload={handleEmailUpload} // Pass the handler for email upload
                selectedEmailFileName={selectedEmailFileName} // Pass the selected email file name
              />
            )}

            {currentStep === 3 && (
              <OAuthSetup
                form={form}
                loading={loading} // Pass loading state if needed
              />
            )}
          </div>
        </form>
      </Form>
      <StepNavigation
        currentStep={currentStep}
        stepsLength={steps.length}
        next={next}
        prev={prev}
      />
    </>
  );
};
