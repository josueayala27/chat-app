import { hash } from 'bcryptjs'
import { z } from 'zod'
import User from '~~/server/models/User'

const userSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  username: z.string().min(3).max(32).regex(/^[\w.-]+$/),
  email: z.string().email(),
  password: z.string(),
})

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, userSchema.parse)

  const exists = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] })

  if (exists) {
    throw createError({ statusCode: 409, statusMessage: 'Username or email already exists.' })
  }

  const password = await hash(body.password, 10)

  const user = new User({ ...body, password })
  await user.save()

  return { user }
})
