import type { z } from 'zod'
import type { IUser } from '../models/User'
import type { userSignUpSchema } from '../validators/user.validator'
import { hash } from 'bcryptjs'
import User from '../models/User'

export type UserSignUpInput = z.infer<typeof userSignUpSchema>

export async function signUp(data: UserSignUpInput): Promise<IUser> {
  const exists = await User.findOne({ $or: [{ username: data.username }, { email: data.email }] }).select('-password')

  if (exists) {
    throw createError({ statusCode: 409, statusMessage: 'Username or email already exists.' })
  }

  const password = await hash(data.password, 10)

  const user = new User({ ...data, password })

  await user.save()

  return user
}
