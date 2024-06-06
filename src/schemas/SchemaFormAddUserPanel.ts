import { z } from 'zod';

export const SchemaFormAddUserPanel = z.object({
  username: z
    .string()
    .min(6, { message: 'Minimum 6 characters.' })
    .toLowerCase(),
  email: z.string().email({ message: 'Invalid email.' }).toLowerCase(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .regex(/(?=.*?[A-Z])/, 'At least one uppercase letter is required.')
    .regex(/(?=.*?[a-z])/, 'At least one lowercase letter is required.')
    .regex(/(?=.*?[0-9])/, 'At least one number is required.')
    .regex(
      /(?=.*?[#?!@$%^&*-])/,
      'At least one special character is required.',
    ),
});
