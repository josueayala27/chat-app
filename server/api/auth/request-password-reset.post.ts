import { defineEventHandler, readBody } from 'h3'
import { findUserByEmail, setPasswordResetToken } from '~/server/services/user.service'
import crypto from 'crypto'
import sgMail from '@sendgrid/mail'

// Set SendGrid API Key - Ensure SENDGRID_API_KEY is set in your environment
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
} else {
  console.warn('SENDGRID_API_KEY is not set. Email sending will be skipped.')
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email } = body

  if (!email) {
    throw createError({ statusCode: 400, statusMessage: 'Email is required' })
  }

  const user = await findUserByEmail(email)

  if (!user) {
    console.log(`Password reset request for non-existent email: ${email}`)
    // Generic success message to prevent email enumeration
    return { message: 'If an account with this email exists, a password reset link has been sent.' }
  }

  try {
    const unhashedToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(unhashedToken).digest('hex')
    const expiresAt = new Date(Date.now() + 3600000) // 1 hour from now

    await setPasswordResetToken(user._id, hashedToken, expiresAt)

    // --- SendGrid Integration ---
    const resetLink = `${process.env.BASE_URL || 'http://localhost:3000'}/reset-password/${unhashedToken}`
    const emailFrom = process.env.RESET_PASSWORD_EMAIL_FROM || 'no-reply@example.com'

    const msg = {
      to: user.email,
      from: emailFrom,
      subject: 'Your Password Reset Request',
      text: `Hello ${user.username || user.email},\n\nPlease click on the following link to reset your password: ${resetLink}\n\nIf you did not request this, please ignore this email.`,
      html: `<strong>Hello ${user.username || user.email},</strong><br><br>Please click on the following link to reset your password: <a href="${resetLink}">${resetLink}</a><br><br>If you did not request this, please ignore this email.`,
    }

    if (process.env.SENDGRID_API_KEY) {
      try {
        await sgMail.send(msg)
        console.log('Password reset email sent to:', user.email)
      } catch (error: any) {
        console.error('Error sending password reset email via SendGrid:', error.response?.body || error.message)
        // Do not throw an error to the client here, as the token is still generated.
        // The user can be informed that the email might not have been sent.
        // For now, we just log it. The generic success message will be returned.
      }
    } else {
      console.log(`SENDGRID_API_KEY not set. Skipping email. Reset link for ${user.email}: ${resetLink}`)
    }
    // --- End of SendGrid Integration ---

    // Generic success message after attempting to send email or logging link
    return { message: 'If an account with this email exists, a password reset link has been sent.' }
  } catch (error: any) {
    console.error('Error in request-password-reset endpoint:', error)
    throw createError({ statusCode: 500, statusMessage: 'Internal server error while processing password reset request.' })
  }
})
