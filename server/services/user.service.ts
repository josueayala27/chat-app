import type { z } from 'zod'
import type { userSignUpSchema } from '../validators/user.validator'
import { hash } from 'bcryptjs'
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

export async function findUserByEmail(email: string): Promise<IUser | null> {
  return User.findOne({ email })
}

export async function setPasswordResetToken(userId: string, token: string, expiresAt: Date): Promise<IUser | null> {
  return User.findByIdAndUpdate(userId, { $set: { resetPasswordToken: token, resetPasswordExpires: expiresAt } }, { new: true })
}

export async function verifyPasswordResetToken(hashedToken: string): Promise<IUser | null> {
  return User.findOne({ resetPasswordToken: hashedToken, resetPasswordExpires: { $gt: Date.now() } })
}

export async function updateUserPassword(userId: string, newPassword: string): Promise<IUser | null> {
  const password = await hash(newPassword, 10)
  return User.findByIdAndUpdate(userId, { $set: { password, resetPasswordToken: undefined, resetPasswordExpires: undefined } }, { new: true })
}
