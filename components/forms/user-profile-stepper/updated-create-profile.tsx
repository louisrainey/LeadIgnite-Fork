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
import { profileSchema, type ProfileFormValues } from '@/lib/form-schema';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertTriangleIcon, Trash, Trash2Icon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import VoiceSelector from './utils/voice/selector';
import { mockVoices } from '@/types/_faker/_api/vapi/assistant';
import { UploadEmailBody } from './utils/voice/uploadEmailBody';

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
const PersonalInformationForm: React.FC<{
  form: any;
  loading: boolean;
  countries: { id: string; name: string }[];
  cities: { id: string; name: string }[];
}> = ({ form, loading, countries, cities }) => (
  <>
    <FormField
      control={form.control}
      name="firstname"
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
      name="lastname"
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
      name="contactno"
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
      id: 'Step 1',
      name: 'Personal Information',
      fields: ['firstname', 'lastname', 'email', 'contactno', 'country', 'city']
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
  const handleScriptFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.name.split('.').pop()?.toLowerCase();
      if (!['txt', 'doc', 'docx'].includes(fileType || '')) {
        alert('Only .txt, .doc, or .docx files are allowed.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setValue('salesscript', text); // Store the script content in the form state
        setSelectedScriptFileName(file.name); // Set the file name using useState
      };
      reader.readAsText(file); // Read the content
    }
  };
  const handleEmailUpload = (fileContent: string) => {
    setValue('emailbody', fileContent); // Store the email body content
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

          {/* Adding Voice Selector */}
          <VoiceSelector voices={voices} onVoiceSelect={handleVoiceSelect} />

          {/* File Upload Section */}
          <div className="mx-auto mt-4 max-w-lg">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Script (.txt, .doc, .docx)
            </label>
            <input
              type="file"
              accept=".txt,.doc,.docx"
              onChange={handleScriptFileUpload}
              className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700 dark:text-gray-300 file:dark:bg-blue-500 dark:hover:file:bg-blue-600"
            />

            {/* Display selected file name and script content */}
            {selectedScriptFileName && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Uploaded file: {selectedScriptFileName}
              </p>
            )}
            {form.watch('salesscript') && (
              <pre className="mt-4 max-h-40 overflow-auto border bg-gray-100 p-4 text-sm text-gray-800 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {form.watch('salesscript')}
              </pre>
            )}
          </div>

          {/* Email Body Upload Component */}
          <UploadEmailBody
            onFileUpload={handleEmailUpload}
            selectedFileName={selectedEmailFileName}
          />
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
