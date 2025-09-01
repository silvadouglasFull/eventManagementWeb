// src/modules/auth/schemas/createUserSchema.ts
import { z } from 'zod';

export const createUserSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters.' }),
    confirmPassword: z.string().min(8, { message: 'Confirm password must be at least 8 characters.' }),
}).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
});

export type CreateUserFormData = z.infer<typeof createUserSchema>;