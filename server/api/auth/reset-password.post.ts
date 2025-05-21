import { defineEventHandler, readBody } from 'h3'
import { verifyPasswordResetToken, updateUserPassword } from '~/server/services/user.service'
import crypto from 'crypto'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { token, newPassword, confirmPassword } = body

  if (!token) {
    throw createError({ statusCode: 400, statusMessage: 'Reset token is required' })
  }
  if (!newPassword || !confirmPassword) {
    throw createError({ statusCode: 400, statusMessage: 'New password and confirmation are required' })
  }
  if (newPassword !== confirmPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Passwords do not match' })
  }

  try {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await verifyPasswordResetToken(hashedToken)

    if (!user) {
      throw createError({ statusCode: 400, statusMessage: 'Invalid or expired password reset token.' })
    }

    await updateUserPassword(user._id, newPassword)

    return { message: 'Password has been reset successfully.' }
  } catch (error: any) {
    console.error('Error in reset-password:', error)
    // Check if it's a known error type, otherwise default to 500
    if (error.statusCode) {
      throw error
    }
    throw createError({ statusCode: 500, statusMessage: 'Internal server error' })
  }
})
