import type { z } from 'zod'
import type { MessageDocument } from '../models/Message'
import type { UserDocument } from '../models/User'
import type { createMessageBodySchema, getMessagesQuerySchema } from '../validators/message.validator'
import mongoose from 'mongoose'
import Message from '../models/Message'

/**
 * Maximum number of messages to fetch per request.
 */
const MESSAGE_FETCH_LIMIT = 50

export type CreateMessageInput = z.infer<typeof createMessageBodySchema> & {
  chat_id: string
  user: UserDocument
}

type GetMessagesInput = z.infer<typeof getMessagesQuerySchema> & { chat_id: string }

/**
 * Creates and stores a new message in the database.
 *
 * @param {CreateMessageInput} data - Message data including chat and user info.
 * @returns {Promise<MessageDocument>} The created message document.
 */
export async function createMessage(data: CreateMessageInput): Promise<MessageDocument> {
  return Message.create({
    chat_id: new mongoose.Types.ObjectId(data.chat_id),
    sender_id: data.user._id,
    content: data.content,
    type: data.type,
    read_by: [{ user_id: data.user._id, read_at: new Date() }],
  })
}

/**
 * Retrieves a list of messages for a chat, paginated before a specific message if provided.
 *
 * @param {GetMessagesInput} params - Query parameters including chat ID and optional cursor.
 * @returns {Promise<MessageDocument[]>} An array of message documents.
 */
export async function getMessages({ chat_id, before }: GetMessagesInput): Promise<MessageDocument[]> {
  return Message
    .find({
      chat_id: new mongoose.Types.ObjectId(chat_id),
      ...(before && { _id: { $lt: new mongoose.Types.ObjectId(before) } }),
    })
    .sort({ created_at: -1 })
    .limit(MESSAGE_FETCH_LIMIT)
    .populate('sender_id', 'first_name last_name')
}
