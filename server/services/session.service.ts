import type { UserDocument } from '../models/User'
import { nanoid } from 'nanoid'
import Session from '../models/Session'

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days

/**
 * Creates a new session for the user and stores it in the database and cache.
 *
 * @param {UserDocument} user - The user's ID.
 * @returns {Promise<string>} The generated session ID.
 */
export async function createSession(user: UserDocument): Promise<string> {
  const session_id = nanoid(32)
  const now = new Date()
  const expires_at = new Date(now.getTime() + SESSION_TTL_SECONDS * 1000)

  await Session.create({ session_id, user_id: user._id, expires_at })

  useStorage('upstash').setItem(`session:${session_id}`, { user_id: user._id, expires_at }, { ttl: SESSION_TTL_SECONDS })

  return session_id
}
