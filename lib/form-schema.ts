import * as z from 'zod';

const htmlRegex = /<\/?[a-z][\s\S]*>/i; // Matches basic HTML tags
const markdownRegex = /(\#|\*|_|`|\[|\]|!|\(|\))/; // Matches basic Markdown symbols

export const profileSchema = z.object({
  firstname: z
    .string()
    .min(3, { message: 'First name must be at least 3 characters long.' })
    .max(50, { message: 'First name cannot exceed 50 characters.' }),

  lastname: z
    .string()
    .min(3, { message: 'Last name must be at least 3 characters long.' })
    .max(50, { message: 'Last name cannot exceed 50 characters.' }),

  email: z
    .string()
    .email({ message: 'Please enter a valid email address.' })
    .max(100, { message: 'Email cannot exceed 100 characters.' }),

  contactno: z
    .string()
    .min(10, { message: 'Contact number must be at least 10 digits.' })
    .max(15, { message: 'Contact number cannot exceed 15 digits.' })
    .refine((value) => /^[0-9]+$/.test(value), {
      message: 'Contact number can only contain numbers.'
    }),

  country: z
    .string()
    .min(1, { message: 'Please select a country.' })
    .max(100, { message: 'Country name cannot exceed 100 characters.' }),

  city: z
    .string()
    .min(1, { message: 'Please select a city.' })
    .max(100, { message: 'City name cannot exceed 100 characters.' }),

  // Optional voice field with max validation
  voice: z
    .string()
    .max(100, { message: 'Voice selection cannot exceed 100 characters.' })
    .optional()
    .nullable(), // Allows the field to be null or not provided

  // Required sales script field
  salesscript: z
    .string()
    .min(10, { message: 'Sales script must be at least 10 characters long.' })
    .max(1000, { message: 'Sales script cannot exceed 1000 characters.' }),
  emailbody: z
    .string()
    .min(10, { message: 'Email body must be at least 10 characters long.' })
    .max(5000, { message: 'Email body cannot exceed 5000 characters.' }) // Optional, adjust as needed
    .refine((value) => htmlRegex.test(value) || markdownRegex.test(value), {
      message: 'Email body must be valid Markdown or HTML.'
    }),
  // Jobs array for dynamic job fields
  jobs: z.array(
    z.object({
      jobcountry: z
        .string()
        .min(1, { message: 'Please select a country for the job.' })
        .max(100, { message: 'Country name cannot exceed 100 characters.' }),
      jobcity: z
        .string()
        .min(1, { message: 'Please select a city for the job.' })
        .max(100, { message: 'City name cannot exceed 100 characters.' }),
      jobtitle: z
        .string()
        .min(3, { message: 'Job title must be at least 3 characters long.' })
        .max(100, { message: 'Job title cannot exceed 100 characters.' }),
      employer: z
        .string()
        .min(3, {
          message: 'Employer name must be at least 3 characters long.'
        })
        .max(100, { message: 'Employer name cannot exceed 100 characters.' }),
      startdate: z
        .string()
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
          message: 'Start date must be in the format YYYY-MM-DD.'
        }),
      enddate: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'End date must be in the format YYYY-MM-DD.'
      })
    })
  )
});

// Export the inferred form values type for use in React Hook Form
export type ProfileFormValues = z.infer<typeof profileSchema>;
