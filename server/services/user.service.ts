import type { z } from 'zod'
import type { UserDocument } from '../models/User'
import type { userLoginSchema, userSignUpSchema } from '../validators/user.validator'
import { compare, hash } from 'bcryptjs'
import User from '../models/User'

export type UserSignUpInput = z.infer<typeof userSignUpSchema>
export type UserLoginInput = z.infer<typeof userLoginSchema>

/**
 * Registers a new user in the system.
 *
 * @param {UserSignUpInput} data - The user sign-up input.
 * @returns {Promise<Omit<UserDocument, 'password'>>} A promise that resolves to the created user document, omitting the password field.
 * @throws Will throw a 409 error if the username or email already exists.
 */
export async function signUp(data: UserSignUpInput): Promise<Omit<UserDocument, 'password'>> {
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
 * @param {UserLoginInput} data - The user's login credentials containing email and password.
 * @returns {Promise<UserDocument>} The authenticated user object.
 * @throws Will throw a 401 error if the user is not found or the password is invalid.
 */
export async function verifyUserCredentials(data: UserLoginInput): Promise<UserDocument> {
  const user = await User.findOne({ email: data.email })
  if (!user) {
    throw createError({ statusCode: 401, message: 'Invalid credentials.' })
  }

  const isPasswordValid = await compare(data.password, user.password)
  if (!isPasswordValid) {
    throw createError({ statusCode: 401, message: 'Invalid credentials.' })
  }

  return user
}
