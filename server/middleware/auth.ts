import Session from '../models/Session'
import User from '../models/User'

export default defineEventHandler(async (event) => {
  if (!isProtected(getRequestURL(event).pathname))
    return

  console.log('🔒 BE: Auth Middleware')

  const sid = getCookie(event, 'sid')

  if (!sid) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' })
  }

  const session = await Session.findOne({
    session_id: sid,
    expires_at: { $gt: new Date() },
  })

  console.log(sid)

  if (!session)
    throw createError({ statusCode: 401, statusMessage: 'Session expired or invalid.' })

  const user = await User.findById(session.user_id).select('-password')
  if (!user)
    throw createError({ statusCode: 401, statusMessage: 'User not found.' })

  event.context.user = user
})
