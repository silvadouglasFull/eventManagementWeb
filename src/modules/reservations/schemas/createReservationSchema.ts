// src/modules/reservations/schemas/createReservationSchema.ts
import { z } from 'zod';

export const createReservationSchema = z.object({
    room_id: z.string().uuid({ message: 'Please select a valid room.' }),
    start_date: z.string().datetime({ message: 'Invalid start date format.' }),
    end_date: z.string().datetime({ message: 'Invalid end date format.' }),
}).refine(data => new Date(data.start_date) < new Date(data.end_date), {
    message: 'End date must be after start date.',
    path: ['end_date'],
});

export type CreateReservationFormData = z.infer<typeof createReservationSchema>;