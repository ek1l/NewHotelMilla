import { z } from 'zod';

export const SchemaForm = z.object({
  name: z.string().min(3, { message: 'Name Invalid' }),
  clubName: z.string().min(3, { message: 'Club Invalid' }),
  email: z.string().email({ message: 'E-mail Invalid' }).toLowerCase(),
  phone: z.string().min(2, { message: 'Phone Invalid' }),
  message: z
    .string()
    .min(10, { message: 'Message Invalid, min 10 characters' }),
});
