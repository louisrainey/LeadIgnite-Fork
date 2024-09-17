import { z } from 'zod';

export const skipTraceSchema = z.object({
  newListName: z
    .string()
    .min(1, { message: 'List name is required' })
    .max(50, { message: 'List name cannot exceed 50 characters' }), // Limits the new list name to 50 characters
  recordsToSkip: z
    .number()
    .min(1, { message: 'You must skip at least 1 record' })
});
