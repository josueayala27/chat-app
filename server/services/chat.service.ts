import type { ObjectId } from 'mongoose'
import type { IChat, IChatUser } from '../models/Chat'
import mongoose from 'mongoose'
import Chat from '../models/Chat'

export async function getUserChatsWithPreview(user_id: ObjectId) {
  return Chat.aggregate([
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
          { $project: { content: 1, sender_id: 1, created_at: 1 } },
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
      $lookup: {
        from: 'users',
        let: { sender_id: '$last_message.sender_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$_id', '$$sender_id'] } } },
          { $project: { username: 1, first_name: 1, last_name: 1 } },
        ],
        as: 'last_message.sender',
      },
    },
    {
      $addFields: {
        'last_message.sender': { $arrayElemAt: ['$last_message.sender', 0] },
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
}

export async function createChat(body: IChat) {
  const users: IChatUser[] = body.users.map(u => ({
    user_id: new mongoose.Types.ObjectId(u.user_id),
    is_admin: !!u.is_admin,
    joined_at: new Date(),
  }))

  return Chat.create({ type: 'group', users, name: body.name })
}
