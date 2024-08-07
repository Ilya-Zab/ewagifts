import { z } from 'zod';

export const currentOrderReducerSchema = z.object({
    currentOrder: z.object({
        orderId: z.number().nullable(),
    })
});

export type currentOrderReducerType = z.infer<typeof currentOrderReducerSchema>;