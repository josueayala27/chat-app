import { createSession } from '~~/server/services/session.service'
import { signUp } from '~~/server/services/user.service'
import { setAuthCookie } from '~~/server/utils/cookie'
import { userSignUpSchema } from '~~/server/validators/user.validator'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, userSignUpSchema.parse)
  const user = await signUp(body)

  const session_id = await createSession(user)

  setAuthCookie(event, session_id) // Use the new utility

  return { success: true, message: 'Registration successful.' }
})
