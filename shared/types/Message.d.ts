export interface ReadBy<T> {
  user_id: T
  read_at: Date
}

export interface Message<T> {
  chat_id: T
  sender_id: T
  content: string
  type: 'text' | 'image' | 'video' | 'file' | 'audio' | 'system'
  attachments?: string[]
  reply_to?: T
  read_by?: ReadBy<T>[]
}
