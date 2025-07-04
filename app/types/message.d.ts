import type { User } from './user'

export interface MessageReadBy {
  user_id: string
  read_at: Date
}

export interface Message {
  _id: string
  chat_id: string
  sender_id: string
  content: string
  type: 'text' | 'media' | 'audio' | 'file'
  attachments?: string[]
  read_by: MessageReadBy[]
  created_at: string
  updated_at: string
}

export interface ChatMessage extends Pick<Message, '_id' | 'chat_id' | 'content' | 'type' | 'attachments' | 'read_by' | 'created_at' | 'updated_at'> {
  sender_id: Pick<User, '_id' | 'first_name' | 'last_name'>
}
