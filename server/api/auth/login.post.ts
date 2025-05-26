import { createSession } from '../../services/session.service'
import { verifyUserCredentials } from '../../services/user.service'
import { setAuthCookie } from '../../utils/cookie'
import { userLoginSchema } from '../../validators/user.validator'

/**
 * Handles user login request.
 *
 * Validates incoming credentials, verifies the user,
 * creates a session, and sets an authentication cookie.
 *
 * @param {H3Event} event - The incoming HTTP event containing the request.
 * @returns {Promise<{ success: boolean, message: string }>} Response object indicating login success.
 */
export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, userLoginSchema.parse)

  const user = await verifyUserCredentials(email, password)

  const sessionId = await createSession(user)

  setAuthCookie(event, sessionId)

  return { success: true, message: 'Login successful.' }
})
