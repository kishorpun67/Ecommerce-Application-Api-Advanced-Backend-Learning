import z, { email } from 'zod'


export const registerUserSchema = z.object({
    firstName: z.string().min(1, "First name cannot be empty"),
    lastName: z.string().optional(),
    username: z.string().min(3, "User name must be al lest 3 charaters"),
    email: z.email(),
    password: z.string().min(6,"Password must be at lest 6 characters long"),
    role: z.enum(["USER","MODERATOR","ADMIN"]).optional(),
    phoneNumber: z.string()
                    .min(6,"Phone number must be at 6 charaters long")
                    .max(12, "Phone number must be less than 12 charters")
})

export const UserResponseSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string().optional(),
    username: z.string(),
    email: z.string().email(),
    phoneNumber: z.string(),
    role: z.enum(["USER", "MODERATOR", "ADMIN"]),
    createdAt: z.date(),
});


export const refreshTokenSchema =z.object({
    token: z.string()
})

export const loginUserShema = z.object({
    email:z.string().email('Please enter valid email'),
    password:z.string()
})

export type registerUserDTO = z.infer<typeof registerUserSchema>
export type UserResponseDTO = z.infer<typeof UserResponseSchema>
export type loginUserDTO = z.infer<typeof loginUserShema>
export type refreshTokenDTO = z.infer<typeof refreshTokenSchema>