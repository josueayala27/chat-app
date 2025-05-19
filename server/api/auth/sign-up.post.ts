import { z } from 'zod'
import User from '~~/server/models/User'

const userSchema = z.object({
  username: z.string(),
  email: z.string().email(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, userSchema.parse)

  const user = new User(body)
  await user.save()

  return { user }
})
