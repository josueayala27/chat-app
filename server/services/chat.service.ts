import mongoose from 'mongoose'
import Chat from '../models/Chat'

export async function getUserChats(user_id: string) {
  return await Chat.find({ 'users.user_id': user_id })
    .sort({ updated_at: -1 })
}

export async function getUserChatsWithPreview(user_id: string) {
  const chats = await Chat.aggregate([
    { $match: { 'users.user_id': new mongoose.Types.ObjectId(user_id) } },
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
        as: 'lastMessage',
      },
    },
    {
      $addFields: {
        lastMessage: { $arrayElemAt: ['$lastMessage', 0] },
      },
    },
  ])
  return chats
}
