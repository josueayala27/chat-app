import type { Types } from 'mongoose'

export interface ReadBy<T = string | Types.ObjectId> {
  user_id: T
  read_at: Date
}

export interface Message<T = string | Types.ObjectId> {
  chat_id: T
  sender_id: T
  content: string
  type: 'text' | 'image' | 'video' | 'file' | 'audio' | 'system'
  attachments?: string[]
  reply_to?: string
  read_by?: ReadBy[]
}
