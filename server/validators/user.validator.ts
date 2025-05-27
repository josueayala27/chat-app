import { z } from 'zod'

/**
 * Sign-up schema: all required fields for creating a new user
 */
export const userSignUpSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),

  /**
   * Username:
   * - length between 3 and 32 characters
   * - allows letters, numbers, underscore (_), dot (.) or hyphen (-)
   */
  username: z.string().min(3).max(32).regex(/^[\w.-]+$/),
  email: z.string().email(),
  password: z.string(),
})

/**
 * Update schema: same fields as sign-up but all optional.
 */
export const userUpdateSchema = userSignUpSchema.partial()

/**
 * Login schema: credentials required to authenticate.
 */
export const userLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
})
