import { z } from 'zod';

const alertSchma = z.object({
    displayName: z.string(),
    description: z.string(),
    priority: z.string(),
    arena: z.string(),
    status: z.string(),
    lon: z.number(),
    lat: z.number()
})

export { alertSchma }