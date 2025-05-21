import type { z } from 'zod'
import type { MessageDocument } from '../models/Message'
import type { UserDocument } from '../models/User'
import type { createMessageBodySchema, getMessagesQuerySchema } from '../validators/message.validator'
import mongoose from 'mongoose'
import Message from '../models/Message'

export type CreateMessageInput = z.infer<typeof createMessageBodySchema> & {
  chat_id: string
  user: UserDocument
}

type GetMessagesInput = z.infer<typeof getMessagesQuerySchema> & { chat_id: string }

export async function createMessage(data: CreateMessageInput): Promise<MessageDocument> {
  return Message.create({
    chat_id: new mongoose.Types.ObjectId(data.chat_id),
    sender_id: data.user._id,
    content: data.content,
    type: data.type,
    read_by: [{ user_id: data.user._id, read_at: new Date() }],
  })
}

export async function getMessages({ chat_id, before }: GetMessagesInput) {
  if (!mongoose.Types.ObjectId.isValid(chat_id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid chat.' })
  }

  const LIMIT = 50

  // TODO: Validate if the user is part of the chat

  return Message.find({
    chat_id: new mongoose.Types.ObjectId(chat_id),
    ...(before && { _id: { $lt: new mongoose.Types.ObjectId(before) } }),
  })
    .sort({ created_at: -1 })
    .limit(LIMIT)
}
