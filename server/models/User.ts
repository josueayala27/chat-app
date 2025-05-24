import type { Document } from 'mongoose'
import type { User } from '../types/user'
import mongoose from 'mongoose'

export interface UserDocument extends User, Document {}

const userSchema = new mongoose.Schema<UserDocument>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordToken: { type: String, select: false }, // select: false to hide by default
  resetPasswordExpires: { type: Date, select: false }, // select: false to hide by default
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})

export default mongoose.model<UserDocument>('User', userSchema)
