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

  let session: any = await useStorage('redis').getItem(`session:${sid}`)

  if (!session) {
    const mongoSession = await Session.findOne({
      session_id: sid,
      expires_at: { $gt: new Date() },
    })

    if (!mongoSession)
      throw createError({ statusCode: 401, statusMessage: 'Session expired or invalid.' })

    const ttlMs = Math.ceil((new Date(mongoSession.expires_at).getTime() - Date.now()) / 1000)

    await useStorage('redis').setItem(
      `session:${sid}`,
      { user_id: mongoSession.user_id, expires_at: mongoSession.expires_at },
      { ttl: ttlMs > 0 ? ttlMs : 1 } 
    )

    session = { user_id: mongoSession.user_id, expires_at: mongoSession.expires_at }
  }

  const user = await User.findById(session.user_id).select('-password')
  if (!user)
    throw createError({ statusCode: 401, statusMessage: 'User not found.' })

  event.context.user = user
})
