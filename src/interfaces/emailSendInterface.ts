import zod from 'zod';
import { emailSendSchema } from '../schemas/emailSend';

export type EmailSend = zod.infer<typeof emailSendSchema>;
