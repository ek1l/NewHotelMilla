import zod from 'zod';

export const emailSendSchema = zod.object({
  email: zod
    .string()
    .email({ message: 'Invalid Email' })
    .min(5, { message: 'Invalid Email' }),
});
