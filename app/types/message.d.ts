export interface MessageReadBy {
  user_id: string
  read_at: Date
}

export interface Message {
  _id: string
  chat_id: string
  sender_id: string
  content: string
  type: 'text' | 'image' | 'video' | 'audio' | 'file'
  attachments?: string[]
  read_by: MessageReadBy[]
  created_at: Date
  updated_at: Date
}
