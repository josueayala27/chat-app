import { z } from 'zod'

export const userSignUpSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z.string().min(3).max(32).regex(/^[\w.-]+$/),
  email: z.string().email(),
  password: z.string(),
})

export const userUpdateSchema = userSignUpSchema.partial()
