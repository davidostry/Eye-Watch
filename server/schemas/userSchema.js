import { email, z } from 'zod';

const userSchma = z.object({
    username: z.string(),
    password: z.string(),
    email: z.email(),
    role: z.literal(["arena_user", "general_user", "admin"]),
    assignedArena: z.literal(["North", "South", "Center", "All"])
})

const loginSchema = z.object({
    username: z.string(),
    password: z.string()
})

export { userSchma, loginSchema }