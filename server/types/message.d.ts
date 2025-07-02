import type { Types } from 'mongoose'

export interface ReadBy {
  user_id: Types.ObjectId
  read_at: Date
}

export interface Message {
  chat_id: Types.ObjectId
  sender_id: Types.ObjectId
  content: string
  type: 'text' | 'attachments' | 'audio' | 'system'
  reply_to?: Types.ObjectId
  read_by?: ReadBy[]
  attachments?: Types.ObjectId[]
}
