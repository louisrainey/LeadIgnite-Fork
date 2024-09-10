import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem
} from '@/components/ui/select';
import { useDropzone } from 'react-dropzone';
import { leadSchema } from '@/types/zod/leadSchema'; // Assuming this contains your Zod schema for validation
import { handleListUpload } from '@/lib/utils/files/extractheadrsFromFiles';

// Define the form values type
interface FormValues {
  listName: string;
  skipTracedFile: File;
  firstNameField: string;
  lastNameField: string;
  streetAddressField: string;
  cityField: string;
  stateField: string;
  zipCodeField: string;
  phone1Field: string;
  phone2Field?: string;
  emailField?: string; // Making email optional
}

interface UploadListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UploadListModal: React.FC<UploadListModalProps> = ({
  isOpen,
  onClose
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedHeader, setSelectedHeader] = useState<string | null>(null); // Track the currently selected header
  const [availableHeaders, setAvailableHeaders] = useState<string[]>(headers); // Track the available headers to show in dropdown

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger
  } = useForm<FormValues>({
    resolver: zodResolver(leadSchema), // Use Zod schema for validation
    mode: 'onChange' // This ensures validation happens on typing
  });
  const listName = watch('listName');
  // Handle file drop
  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length) {
      const file = acceptedFiles[0];
      setUploadedFile(file); // Set the uploaded file

      try {
        const extractedHeaders: string[] = await handleListUpload(file); // Call handleListUpload function
        setHeaders(extractedHeaders); // Set extracted headers
        console.log(headers);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError('Error extracting headers from the file'); // Handle errors
        console.log(error);
        setHeaders([]); // Clear headers if there's an error
      }
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx'
      ]
    },
    maxSize: 2 * 1024 * 1024 * 1024 // 2 GB
  });

  // Form submission handler
  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
    alert('submitted');
    // Handle form submission, e.g., send data to API
  };

  // If the modal is not open, don't render it
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        {/* Close button */}
        <button
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold dark:text-white">
          Upload a skip-traced list
        </h2>
        <p className="mb-4 text-gray-500 dark:text-gray-400">
          The list you select must be skip-traced.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* List Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              List Name*
            </label>
            <Input
              placeholder="Give your list a friendly name"
              {...register('listName')}
            />
            {errors.listName && (
              <p className="text-sm text-red-500">{errors.listName.message}</p>
            )}
          </div>

          {/* File Upload */}
          {/* File Upload Input (Dropzone) */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Skip-traced list*
            </label>
            <div
              {...getRootProps()} // Properly apply dropzone props
              className={`mt-2 border-2 border-dashed p-4 
          ${
            !listName?.trim()
              ? 'cursor-not-allowed bg-gray-200 dark:bg-gray-700'
              : 'cursor-pointer border-gray-300 dark:border-gray-600'
          }`}
            >
              <input
                {...getInputProps()}
                disabled={!listName?.trim()} // Disable input if listName is invalid
              />
              {uploadedFile ? (
                <p>{uploadedFile.name}</p>
              ) : (
                <p>
                  {listName?.trim()
                    ? 'Click to upload or drag and drop (CSV or XLSX)'
                    : 'Provide a valid List Name to enable uploading'}
                </p>
              )}
            </div>
            {errors.skipTracedFile && (
              <p className="text-sm text-red-500">
                {errors.skipTracedFile.message}
              </p>
            )}
          </div>

          {/* Fields Mapping */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300">
                First Name*
              </label>
              <Select
                disabled={!listName?.trim() || !uploadedFile}
                {...register('firstNameField')}
              >
                <SelectTrigger className="w-full dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <SelectValue placeholder="Match first name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {headers.map((header, index) => (
                      <SelectItem key={index} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.firstNameField && (
                <p className="text-sm text-red-500">
                  {errors.firstNameField.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300">
                Last Name*
              </label>
              <Select
                disabled={!listName?.trim() || !uploadedFile}
                {...register('lastNameField')}
              >
                <SelectTrigger className="w-full dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <SelectValue placeholder="Match last name" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {headers.map((header, index) => (
                      <SelectItem key={index} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.lastNameField && (
                <p className="text-sm text-red-500">
                  {errors.lastNameField.message}
                </p>
              )}
            </div>

            {/* Street Address */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300">
                Street Address*
              </label>
              <Select
                disabled={!listName?.trim() || !uploadedFile}
                {...register('streetAddressField')}
              >
                <SelectTrigger className="w-full dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <SelectValue placeholder="Match street address" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {headers.map((header, index) => (
                      <SelectItem key={index} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.streetAddressField && (
                <p className="text-sm text-red-500">
                  {errors.streetAddressField.message}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300">
                City*
              </label>
              <Select
                disabled={!listName?.trim() || !uploadedFile}
                {...register('cityField')}
              >
                <SelectTrigger className="w-full dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <SelectValue placeholder="Match city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {headers.map((header, index) => (
                      <SelectItem key={index} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.cityField && (
                <p className="text-sm text-red-500">
                  {errors.cityField.message}
                </p>
              )}
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300">
                State*
              </label>
              <Select
                disabled={!listName?.trim() || !uploadedFile}
                {...register('stateField')}
              >
                <SelectTrigger className="w-full dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <SelectValue placeholder="Match state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {headers.map((header, index) => (
                      <SelectItem key={index} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.stateField && (
                <p className="text-sm text-red-500">
                  {errors.stateField.message}
                </p>
              )}
            </div>

            {/* Zip Code */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300">
                Zip Code*
              </label>
              <Select
                disabled={!listName?.trim() || !uploadedFile}
                {...register('zipCodeField')}
              >
                <SelectTrigger className="w-full dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <SelectValue placeholder="Match ZIP code" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {headers.map((header, index) => (
                      <SelectItem key={index} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.zipCodeField && (
                <p className="text-sm text-red-500">
                  {errors.zipCodeField.message}
                </p>
              )}
            </div>

            {/* Phone 1 */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300">
                Phone 1*
              </label>
              <Select
                disabled={!listName?.trim() || !uploadedFile}
                {...register('phone1Field')}
              >
                <SelectTrigger className="w-full dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <SelectValue placeholder="Match phone 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {headers.map((header, index) => (
                      <SelectItem key={index} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.phone1Field && (
                <p className="text-sm text-red-500">
                  {errors.phone1Field.message}
                </p>
              )}
            </div>

            {/* Phone 2 (Optional) */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300">
                Phone 2
              </label>
              <Select
                disabled={!listName?.trim() || !uploadedFile}
                {...register('phone2Field')}
              >
                <SelectTrigger className="w-full dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <SelectValue placeholder="Match phone 2" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {headers.map((header, index) => (
                      <SelectItem key={index} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-sm font-medium dark:text-gray-300">
                Email
              </label>
              <Select
                disabled={!listName?.trim() || !uploadedFile}
                {...register('emailField')}
              >
                <SelectTrigger className="w-full dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  <SelectValue placeholder="Match email" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {headers.map((header, index) => (
                      <SelectItem key={index} value={header}>
                        {header}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.emailField && (
                <p className="text-sm text-red-500">
                  {errors.emailField.message}
                </p>
              )}
            </div>
          </div>

          <Button
            disabled={!listName?.trim() || !uploadedFile} // Check if listName is valid and a file is uploaded
            type="submit"
            className={`mt-4 ${
              !listName?.trim() || !uploadedFile
                ? 'bg-gray-400'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            } `}
          >
            Upload
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UploadListModal;
