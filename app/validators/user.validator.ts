import { z } from 'zod'

/**
 * Login schema: credentials required to authenticate.
 */
export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
