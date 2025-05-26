import { z } from 'zod'

export const userSignUpSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z.string().min(3).max(32).regex(/^[\w.-]+$/),
  email: z.string().email(),
  password: z.string(),
})

export const userUpdateSchema = userSignUpSchema.partial()

export const userLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
})
