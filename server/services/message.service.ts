import type { Types } from 'mongoose'
import type { z } from 'zod'
import type { createMessageBodySchema } from '../validators/message.validator'
import mongoose from 'mongoose'
import Message from '../models/Message'

export type CreateMessageInput = z.infer<typeof createMessageBodySchema> & {
  chat_id: string
  user: Types.ObjectId
}

export async function createMessage(data: CreateMessageInput) {
  return Message.create({
    chat_id: new mongoose.Types.ObjectId(data.chat_id),
    sender_id: data.user._id,
    content: data.content,
    type: data.type,
    read_by: [{ user_id: data.user._id, read_at: new Date() }],
  })
}
