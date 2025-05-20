import type { Document, Types } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface IChatUser {
  user_id: Types.ObjectId
  is_admin?: boolean
  joined_at: Date
}

export interface IChat extends Document {
  type: 'private' | 'group'
  users: IChatUser[]
  name?: string
  avatar_url?: string
  description?: string
}

const chatUserSchema: Schema<IChatUser> = new mongoose.Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    is_admin: { type: Boolean, default: false },
    joined_at: { type: Date, default: Date.now },
  },
  { _id: false },
)

const chatSchema = new mongoose.Schema<IChat>({
  type: { type: String, enum: ['private', 'group'], required: true },
  users: { type: [chatUserSchema], required: true },
  name: { type: String },
  avatar_url: { type: String },
  description: { type: String },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})

chatSchema.index({ 'type': 1, 'users.user_id': 1 })

export default mongoose.model<IChat>('Chat', chatSchema)
