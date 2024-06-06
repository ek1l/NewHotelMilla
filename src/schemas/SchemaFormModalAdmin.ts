import { z } from 'zod';

export const SchemaFormModalAdmin = z.object({
  name: z.string().min(3, { message: 'Name Invalid' }),
  address: z.string().min(3, { message: 'Address Invalid' }),
  description: z
    .string()
    .min(10, { message: 'Description Invalid, min 10 characters' }),
  accommodation: z
    .string()
    .min(1, { message: 'Accommodation Invalid, min 10 characters' }),
  activities: z
    .string()
    .min(10, { message: 'Activities Invalid, min 10 characters' }),
  destination: z
    .string()
    .min(10, { message: 'Destination Invalid, min 10 characters' }),
});
