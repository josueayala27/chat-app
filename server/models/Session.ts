import type { Document, Model, Types } from 'mongoose'
import mongoose, { Schema } from 'mongoose'

export interface ISession extends Document {
  session_id: string
  user_id: Types.ObjectId
  expires_at: Date
}

const SessionSchema = new Schema<ISession>({
  session_id: { type: String, required: true, unique: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expires_at: { type: Date, required: true },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})

export default (mongoose.models.Session as Model<ISession>) || mongoose.model<ISession>('Session', SessionSchema)
