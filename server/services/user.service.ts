import type { z } from 'zod'
import type { userSignUpSchema } from '../validators/user.validator'
import { hash, compare } from 'bcryptjs' // Added compare
import User from '../models/User'
// Session and nanoid are removed as they are no longer needed in this function

// You might need to import createError if not globally available
// import { createError } from 'h3'; 

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

export async function verifyUserCredentials(email?: string, password?: string) {
  if (!email || !password) {
    throw createError({ statusCode: 400, message: 'Email and password are required' });
  }

  const user = await User.findOne({ email });
  if (!user) {
    // It's good practice to not reveal if the user exists or not for security reasons
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }

  const isPasswordValid = await compare(password, user.password);
  if (!isPasswordValid) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' });
  }

  return user; // Return the full user object
}
