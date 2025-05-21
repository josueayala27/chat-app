import mongoose from 'mongoose'
import Message from '../models/Message'

export async function createMessage(data: Message<string>) {
  return Message.create({
    chat_id: new mongoose.Types.ObjectId(param),
    sender_id: new mongoose.Types.ObjectId(user._id),
    content: body.content,
    type: body.type,
    read_by: [{ user_id: user._id, read_at: new Date() }],
  })
}
