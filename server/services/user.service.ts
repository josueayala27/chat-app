import type { z } from 'zod'
import type { UserDocument } from '../models/User'
import type { userSignUpSchema } from '../validators/user.validator'
import { compare, hash } from 'bcryptjs'
import User from '../models/User'

export type UserSignUpInput = z.infer<typeof userSignUpSchema>

// TODO: type return
export async function signUp(data: UserSignUpInput) {
  const exists = await User.findOne({ $or: [{ username: data.username }, { email: data.email }] }).select('-password')

  if (exists) {
    throw createError({ statusCode: 409, statusMessage: 'Username or email already exists.' })
  }

  const password = await hash(data.password, 10)

  const user = new User({ ...data, password })
  await user.save()

  return user
}

/**
 * Verifies a user's credentials by checking the email and password.
 *
 * @param {string} [email] - The user's email address.
 * @param {string} [password] - The user's plain text password.
 * @returns {Promise<object>} The authenticated user object.
 * @throws Will throw a 401 error if the user is not found or the password is invalid.
 */
export async function verifyUserCredentials(email?: string, password?: string): Promise<UserDocument> {
  const user = await User.findOne({ email })
  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  const isPasswordValid = await compare(password, user.password)
  if (!isPasswordValid) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  return user
}
