import type { ObjectId } from 'mongoose'
import type { IChat, IChatUser } from '../models/Chat'
import mongoose from 'mongoose'
import Chat from '../models/Chat'

export async function getUserChatsWithPreview(user_id: ObjectId) {
  const chats = await Chat.aggregate([
    { $match: { 'users.user_id': user_id } },
    { $sort: { updated_at: -1 } },
    {
      $lookup: {
        from: 'messages',
        let: { chat_id: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$chat_id', '$$chat_id'] } } },
          { $sort: { created_at: -1 } },
          { $limit: 1 },
        ],
        as: 'last_message',
      },
    },
    {
      $addFields: {
        last_message: { $arrayElemAt: ['$last_message', 0] },
      },
    },
    {
      $project: {
        users: 0,
        created_at: 0,
        updated_at: 0,
      },
    },
  ])
  return chats
}

export async function createChat(body: IChat) {
  const users: IChatUser[] = body.users.map(u => ({
    user_id: new mongoose.Types.ObjectId(u.user_id),
    is_admin: !!u.is_admin,
    joined_at: new Date(),
  }))

  return Chat.create({ type: 'group', users, name: body.name })
}
