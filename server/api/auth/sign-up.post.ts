import { createSession } from '~~/server/services/session.service'
import { signUp } from '~~/server/services/user.service'
import { userSignUpSchema } from '~~/server/validators/user.validator'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, userSignUpSchema.parse)
  const user = await signUp(body)

  const session_id = await createSession(user._id as string)

  setCookie(event, 'sid', session_id, { httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 7 })

  return { success: true, message: 'Registration successful.' }
})
