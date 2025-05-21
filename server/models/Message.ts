import type { Document, Model, Types } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface IReadBy {
  user_id: Types.ObjectId
  read_at: Date
}

export interface IMessage extends Document {
  chat_id: Types.ObjectId
  sender_id: Types.ObjectId
  content: string
  type: 'text' | 'image' | 'video' | 'file' | 'audio' | 'system'
  attachments?: string[]
  reply_to?: Types.ObjectId
  read_by?: IReadBy[]
}

const readBySchema: Schema<IReadBy> = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    read_at: { type: Date, required: true },
  },
  { _id: false },
)

const messageSchema: Schema<IMessage> = new Schema(
  {
    chat_id: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    type: { type: String, enum: ['text', 'image', 'video', 'file', 'audio', 'system'], default: 'text' },
    attachments: [{ type: String }],
    reply_to: { type: Schema.Types.ObjectId, ref: 'Message' },
    read_by: { type: [readBySchema], default: [] },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
)

messageSchema.index({ chat_id: 1, created_at: -1 })

export default (mongoose.models.Message as Model<IMessage>) || mongoose.model<IMessage>('Message', messageSchema)
