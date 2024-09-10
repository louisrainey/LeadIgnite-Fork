import React, { useState } from 'react';
import { leadSchema } from '@/types/zod/leadSchema'; // Your schema import

const AddLeadModal = ({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('1');
  const [email, setEmail] = useState('');

  // State for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Real-time validation function
  const validateField = (field: string, value: string) => {
    const result = leadSchema.safeParse({
      firstName: field === 'firstName' ? value : firstName,
      lastName: field === 'lastName' ? value : lastName,
      address: field === 'address' ? value : address,
      city: field === 'city' ? value : city,
      state: field === 'state' ? value : state,
      zipCode: field === 'zipCode' ? value : zipCode,
      phoneNumber: field === 'phoneNumber' ? value : phoneNumber,
      email: field === 'email' ? value : email
    });

    if (!result.success) {
      const validationErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [field]: '' }));
    }
  };

  const handleAddLead = () => {
    const result = leadSchema.safeParse({
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      phoneNumber,
      email
    });

    if (!result.success) {
      const validationErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        validationErrors[error.path[0]] = error.message;
      });
      setErrors(validationErrors);
      return;
    }

    // Clear form and errors, then close the modal
    setFirstName('');
    setLastName('');
    setAddress('');
    setCity('');
    setState('');
    setZipCode('');
    setPhoneNumber('1');
    setEmail('');
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 dark:bg-opacity-80">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        {/* Modal Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold dark:text-white">
            Add New Lead
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
          >
            &times;
          </button>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              First Name<span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Enter first name"
              value={firstName}
              maxLength={50}
              onChange={(e) => {
                setFirstName(e.target.value);
                validateField('firstName', e.target.value);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Last Name<span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter last name"
              value={lastName}
              maxLength={50}
              onChange={(e) => {
                setLastName(e.target.value);
                validateField('lastName', e.target.value);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500"
            />
            {errors.lastName && (
              <p className="text-sm text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>
        {/* Address Input */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Street<span className="text-red-500">*</span>
          </label>
          <input
            id="address"
            type="text"
            placeholder="Enter an address"
            value={address}
            maxLength={100}
            onChange={(e) => {
              setAddress(e.target.value);
              validateField('address', e.target.value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500"
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* City Input */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              City<span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              type="text"
              placeholder="Enter city"
              value={city}
              maxLength={50}
              onChange={(e) => {
                setCity(e.target.value);
                validateField('city', e.target.value);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500"
            />
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city}</p>
            )}
          </div>

          {/* State Input */}
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              State<span className="text-red-500">*</span>
            </label>
            <input
              id="state"
              type="text"
              placeholder="Enter state"
              value={state}
              maxLength={50}
              onChange={(e) => {
                setState(e.target.value);
                validateField('state', e.target.value);
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500"
            />
            {errors.state && (
              <p className="text-sm text-red-500">{errors.state}</p>
            )}
          </div>
        </div>

        {/* Zip Code Input */}
        <div className="mb-4">
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Zip Code<span className="text-red-500">*</span>
          </label>
          <input
            id="zipCode"
            type="text"
            placeholder="Enter zip code"
            value={zipCode}
            maxLength={10}
            onChange={(e) => {
              setZipCode(e.target.value);
              validateField('zipCode', e.target.value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500"
          />
          {errors.zipCode && (
            <p className="text-sm text-red-500">{errors.zipCode}</p>
          )}
        </div>

        {/* Phone Number and Email Fields (same as before) */}
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            id="phoneNumber"
            type="text"
            placeholder="Enter the phone number"
            value={phoneNumber}
            maxLength={15}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              validateField('phoneNumber', e.target.value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500"
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email<span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField('email', e.target.value);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Add Lead Button */}
        <div className="flex justify-end">
          <button
            onClick={handleAddLead}
            className="rounded-md bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Add Lead
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLeadModal;
