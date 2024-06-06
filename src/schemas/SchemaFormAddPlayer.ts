import { z } from 'zod';

export const SchemaFormAddPlayer = z.object({
  name: z.string().min(3, { message: 'Name Invalid, min 3 characters' }),
  role: z.string().min(3, { message: 'Positin  Invalid, min 3 characters' }),
});
