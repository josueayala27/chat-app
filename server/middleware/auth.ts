import type { ISession } from '../models/Session'
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

  const storage = useStorage('upstash')

  let session = await storage.getItem<Pick<ISession, 'user_id' | 'expires_at'>>(`session:${sid}`)

  if (!session) {
    const mongoSession = await Session.findOne({
      session_id: sid,
      expires_at: { $gt: new Date() },
    })

    if (!mongoSession)
      throw createError({ statusCode: 401, statusMessage: 'Session expired or invalid.' })

    const ttlMs = Math.ceil((new Date(mongoSession.expires_at).getTime() - Date.now()) / 1000)

    await storage.setItem(
      `session:${sid}`,
      { user_id: mongoSession.user_id, expires_at: mongoSession.expires_at },
      { ttl: ttlMs > 0 ? ttlMs : 1 },
    )

    session = { user_id: mongoSession.user_id, expires_at: mongoSession.expires_at }
  }

  const user = await User.findById(session.user_id).select('-password -created_at -updated_at')

  if (!user)
    throw createError({ statusCode: 401, statusMessage: 'User not found.' })

  event.context.user = user
})
