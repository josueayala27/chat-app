import type { Document, Schema } from 'mongoose'
import mongoose from 'mongoose'

export interface IUser extends Document {
  first_name: string
  last_name: string
  username: string
  email: string
  password: string
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})

export default mongoose.model('User', userSchema)
