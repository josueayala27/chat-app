import type { Document, Model } from 'mongoose'
import type { Message, ReadBy } from '../types/message'
import mongoose, { Schema } from 'mongoose'

export interface MessageDocument extends Message, Document {}

const readBySchema: Schema<ReadBy> = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    read_at: { type: Date, required: true },
  },
  { _id: false },
)

const messageSchema: Schema<MessageDocument> = new Schema(
  {
    chat_id: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['text', 'file', 'audio', 'system'], default: 'text' },

    reply_to: { type: Schema.Types.ObjectId, ref: 'Message' },
    read_by: { type: [readBySchema] },

    content: { type: String, required: true },
    attachments: [{ type: Schema.Types.ObjectId }],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

export default (mongoose.models.Message as Model<MessageDocument>) || mongoose.model<MessageDocument>('Message', messageSchema)
