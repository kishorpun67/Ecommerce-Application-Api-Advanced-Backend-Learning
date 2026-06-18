import z from 'zod'


export const registerUserSchema = z.object({
    firstName: z.string()
})