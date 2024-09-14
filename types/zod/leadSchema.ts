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
    .min(5, 'Zip Code must be at least 5 digits')
    .max(10, 'Zip Code cannot exceed 10 digits')
    .regex(/^\d+$/, 'Zip Code must contain only numbers'),

  phoneNumber: z
    .string()
    .min(1, 'Phone Number is required')
    .max(15, 'Phone Number cannot exceed 15 characters')
    .regex(
      /^[0-9\-+()\s]*$/,
      'Phone Number can only contain numbers and special characters like - + ( )'
    ),

  phoneNumber2: z
    .string()
    .max(15, 'Phone Number 2 cannot exceed 15 characters')
    .regex(
      /^[0-9\-+()\s]*$/,
      'Phone Number 2 can only contain numbers and special characters like - + ( )'
    )
    .optional(), // Making phone number 2 optional

  email: z.string().email('Please enter a valid email address').optional(), // Making email optional

  // Social media platforms (optional)
  facebook: z.string().url('Please enter a valid Facebook URL').optional(), // Facebook profile is optional

  linkedin: z.string().url('Please enter a valid LinkedIn URL').optional(), // LinkedIn profile is optional

  instagram: z.string().url('Please enter a valid Instagram URL').optional(), // Instagram profile is optional

  twitter: z.string().url('Please enter a valid Twitter URL').optional() // Twitter profile is optional
});
