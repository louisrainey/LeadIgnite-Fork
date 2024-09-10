import { z } from 'zod';

export const leadSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First Name is required')
    .max(50, 'First Name cannot exceed 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last Name is required')
    .max(50, 'Last Name cannot exceed 50 characters'),
  address: z
    .string()
    .min(1, 'Address is required')
    .max(100, 'Address cannot exceed 100 characters'),
  city: z
    .string()
    .min(1, 'City is required')
    .max(50, 'City cannot exceed 50 characters'),
  state: z
    .string()
    .min(1, 'State is required')
    .max(50, 'State cannot exceed 50 characters'),
  zipCode: z
    .string()
    .min(5, 'Zip Code is required and must be 5 digits')
    .max(10, 'Zip Code cannot exceed 10 characters'),
  phoneNumber: z
    .string()
    .min(1, 'Phone Number is required')
    .max(12, 'Phone Number cannot exceed 15 characters')
    .regex(
      /^[0-9\-+()\s]*$/,
      'Phone Number can only contain numbers and special characters like - + ( )'
    ),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
});
