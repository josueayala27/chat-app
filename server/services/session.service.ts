import { nanoid } from 'nanoid'
import Session from '../models/Session'

export async function createSession(user_id: string): Promise<string> {
  const session_id = nanoid(32)

  const now = new Date()
  const expires_at = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 7)

  await Session.create({
    session_id,
    user_id,
    expires_at,
  })

  useStorage('redis').setItem(`session:${session_id}`, { user_id, expires_at }, { ttl: 60 * 60 * 24 * 7 })

  return session_id
}
