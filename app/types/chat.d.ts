export interface ChatUser {
  user_id: string
  is_admin: boolean
  joined_at: Date
}

export interface Chat {
  _id: string
  type: 'private' | 'group'
  users: ChatUser[]
  name?: string
  created_at: Date
  updated_at: Date
}

interface ChatList extends Pick<Chat, '_id' | 'type' | 'name'> {
  last_message: Pick<Message, '_id' | 'content' | 'created_at'> & {
    sender: Pick<User, '_id' | 'first_name' | 'last_name' | 'username'>
  }
  friend?: Pick<User, '_id' | 'first_name' | 'last_name' | 'username'>
}
