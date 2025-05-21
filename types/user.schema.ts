import { z } from "zod";

export const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
})

export const CreateUserSchema = UserSchema

export const UpdateUserSchema = UserSchema.omit({ id: true })

export type User = z.infer<typeof UserSchema>

export type CreateUserInput = z.infer<typeof CreateUserSchema>

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>