import process from 'node:process'
import { User } from '../../models/User'
import { Session } from '../../models/Session'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)

  const user = await User.findOne({ email })

  if (!user || !user.comparePassword(password)) {
    throw createError({ statusCode: 401, message: 'Invalid credentials' })
  }

  const session = await Session.create({ userId: user._id })

  setCookie(event, 'sid', session._id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })

  return { ok: true }
})
