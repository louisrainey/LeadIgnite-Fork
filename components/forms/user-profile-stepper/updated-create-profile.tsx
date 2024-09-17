'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
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
} from '@/types/zod/profile-form-schema';
import { cn } from '@/lib/utils/kanban/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangleIcon, Trash, Trash2Icon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import VoiceSelector from './utils/voice/selector';
import { mockVoices } from '@/types/_faker/_api/vapi/assistant';
import { UploadEmailBody } from './utils/voice/uploadEmailBody';
import UploadSalesScript from './utils/voice/uploadScript';

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
  <div className="flex items-center justify-between">
    <Heading title={title} description={description} />
    {showDeleteButton && (
      <Button
        disabled={loading}
        variant="destructive"
        size="sm"
        onClick={onDelete}
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
  voices: AssistantVoice[]; // Add voices prop for VoiceSelector
  handleVoiceSelect: (voiceId: string) => void; // Voice select handler
  handleScriptUpload: (scriptContent: string) => void; // Script upload handler
  selectedScriptFileName: string; // Selected script file name
  handleEmailUpload: (emailContent: string) => void; // Email upload handler
  selectedEmailFileName: string; // Selected email file name
}> = ({
  form,
  loading,
  countries,
  cities,
  voices,
  handleVoiceSelect,
  handleScriptUpload,
  selectedScriptFileName,
  handleEmailUpload,
  selectedEmailFileName
}) => (
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
      name="contactNum"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Contact Number</FormLabel>
          <FormControl>
            <Input
              type="number"
              placeholder="Enter your contact number"
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

    {/* Add margin to ensure spacing between sections */}
    <div className="mt-4">
      {/* Adding Voice Selector */}
      <FormLabel>(Optional) Select Voice</FormLabel>

      <VoiceSelector voices={voices} onVoiceSelect={handleVoiceSelect} />
    </div>

    <div className="mt-4">
      {/* File Upload Section for Sales Script */}
      <FormLabel>(Optional) Sales Script</FormLabel>

      <UploadSalesScript
        onFileUpload={handleScriptUpload}
        selectedFileName={selectedScriptFileName}
      />
    </div>

    <div className="mt-4">
      {/* Email Body Upload Component */}
      <FormLabel>(Optional) Email Body</FormLabel>

      <UploadEmailBody
        onFileUpload={handleEmailUpload}
        selectedFileName={selectedEmailFileName}
      />
    </div>
  </>
);

// 3. Job Accordion Component
const JobAccordion: React.FC<{
  fields: any[];
  remove: (index: number) => void;
  form: any;
  index: number;
  loading: boolean;
  countries: { id: string; name: string }[];
  cities: { id: string; name: string }[];
}> = ({ fields, remove, form, index, loading, countries, cities }) => (
  <Accordion
    type="single"
    collapsible
    defaultValue="item-1"
    key={fields[index].id}
  >
    <AccordionItem value="item-1">
      <AccordionTrigger>
        {`Work Experience ${index + 1}`}
        <Button
          variant="outline"
          size="icon"
          className="absolute right-8"
          onClick={() => remove(index)}
        >
          <Trash2Icon className="h-4 w-4 " />
        </Button>
      </AccordionTrigger>
      <AccordionContent>
        <div
          className={cn(
            'relative mb-4 gap-8 rounded-md border p-4 md:grid md:grid-cols-3'
          )}
        >
          <FormField
            control={form.control}
            name={`jobs.${index}.jobtitle`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input type="text" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`jobs.${index}.employer`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employer</FormLabel>
                <FormControl>
                  <Input type="text" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`jobs.${index}.startdate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start date</FormLabel>
                <FormControl>
                  <Input type="date" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`jobs.${index}.enddate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End date</FormLabel>
                <FormControl>
                  <Input type="date" disabled={loading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={`jobs.${index}.jobcountry`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job country</FormLabel>
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
                        placeholder="Select your job country"
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
          <FormField
            control={form.control}
            name={`jobs.${index}.jobcity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job city</FormLabel>
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
                        placeholder="Select your job city"
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
        </div>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
);

// 4. Step Navigation Component
// 4. Step Navigation Component
const StepNavigation: React.FC<{
  currentStep: number;
  stepsLength: number;
  next: () => void;
  prev: () => void;
  nextDisabled?: boolean; // Added nextDisabled prop (optional)
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

    {/* Next Button */}
    <button
      type="button"
      onClick={next}
      disabled={currentStep === stepsLength - 1 || nextDisabled}
      className="rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Next
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
  const [selectedScriptFileName, setSelectedScriptFileName] =
    useState<string>(''); // Track uploaded file name
  const [selectedEmailFileName, setSelectedEmailFileName] =
    useState<string>(''); // Track uploaded file name

  const [selectedVoice, setSelectedVoice] = useState<string | null>(null); // Track selected voice
  const title = initialData ? 'Edit product' : 'Create Your Profile';
  const description = initialData
    ? 'Edit a product.'
    : 'To create your resume, we first need some basic information about you.';
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState({});

  const defaultValues = {
    jobs: [
      {
        jobtitle: '',
        employer: '',
        startdate: '',
        enddate: '',
        jobcountry: '',
        jobcity: ''
      }
    ]
  };

  // useForm setup with Zod validation
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const {
    control,
    setValue, // Used to set values programmatically for form fields
    formState: { isValid, isSubmitting }
  } = form;
  const { append, remove, fields } = useFieldArray({ control, name: 'jobs' });

  const steps = [
    {
      id: 'My Details',
      name: 'Base Setup',
      fields: [
        'firstName',
        'lastName',
        'email',
        'contactNum',
        'country',
        'city',
        'companyName',
        'companyLogo',
        'voiceID',
        'emailBody',
        'salesScript'
      ]
    },
    {
      id: 'Step 2',
      name: 'Professional Information',
      fields: fields
        .map((_, index) => [
          `jobs.${index}.jobtitle`,
          `jobs.${index}.employer`,
          `jobs.${index}.startdate`,
          `jobs.${index}.enddate`,
          `jobs.${index}.jobcountry`,
          `jobs.${index}.jobcity`
        ])
        .flat()
    },
    { id: 'Step 3', name: 'Complete' }
  ];

  const next = async () => {
    const stepFields = steps[currentStep].fields as (keyof ProfileFormValues)[];

    const isStepValid = await form.trigger(stepFields);

    if (isStepValid) {
      if (currentStep < steps.length - 1) {
        if (currentStep === steps.length - 2) {
          await form.handleSubmit((data) => setData(data))();
        }
        setCurrentStep((step) => step + 1);
      }
    }
  };

  const prev = () => {
    if (currentStep > 0) setCurrentStep((step) => step - 1);
  };

  const countries = [{ id: '1', name: 'India' }];
  const cities = [{ id: '2', name: 'Kerala' }];

  const voices: AssistantVoice[] = mockVoices; // Generate 5 mock voices

  // Handle voice selection (use useState for tracking selected voice)
  const handleVoiceSelect = (voiceId: string) => {
    setSelectedVoice(voiceId); // Set voice state when selected
    console.log('Selected voice:', voiceId);
  };

  // Function to handle file uploads
  const handleScriptUpload = (fileContent: string) => {
    setValue('salesScript', fileContent); // Store the email body content
    console.log('Uploaded Email Body Content:', fileContent);
  };
  const handleEmailUpload = (fileContent: string) => {
    setValue('emailBody', fileContent); // Store the email body content
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
      <Separator />
      <div>
        <ul className="flex gap-4">
          {steps.map((step, index) => (
            <li key={step.name} className="md:flex-1">
              <div
                className={cn(
                  'group flex w-full flex-col py-2 pl-4',
                  currentStep > index
                    ? 'border-l-4 border-sky-600'
                    : 'border-l-4 border-gray-200'
                )}
              >
                <span
                  className={cn(
                    'text-sm font-medium',
                    currentStep > index ? 'text-sky-600' : 'text-gray-500'
                  )}
                >
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Separator />
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
                voices={voices} // Pass the voices prop for VoiceSelector
                handleVoiceSelect={handleVoiceSelect} // Pass the handler for voice selection
                handleScriptUpload={handleScriptUpload} // Pass the handler for script upload
                selectedScriptFileName={selectedScriptFileName} // Pass the selected script file name
                handleEmailUpload={handleEmailUpload} // Pass the handler for email upload
                selectedEmailFileName={selectedEmailFileName} // Pass the selected email file name
              />
            )}

            {currentStep === 1 &&
              fields.map((field, index) => (
                <JobAccordion
                  key={index}
                  fields={fields}
                  remove={remove}
                  form={form}
                  index={index}
                  loading={loading}
                  countries={countries}
                  cities={cities}
                />
              ))}
            {currentStep === 2 && (
              <div>
                <h1>Completed</h1>
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(data)}
                </pre>
              </div>
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
