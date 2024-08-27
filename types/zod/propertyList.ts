import * as z from 'zod';

export const mapFormSchema = z.object({
  location: z.string().nonempty('Location is required'),
  marketStatus: z.string().optional(),
  beds: z.string().optional(),
  baths: z.string().optional(),
  propertyType: z.string().optional(),
  advanced: z.object({
    radius: z.string().optional(),
    pastDays: z.string().optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
    mlsOnly: z.boolean().optional(),
    foreclosure: z.boolean().optional(),
    proxy: z.string().optional(),
    extraPropertyData: z.boolean().optional(),
    excludePending: z.boolean().optional(),
    limit: z.string().optional()
  })
});
