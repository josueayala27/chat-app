import type { Document } from 'mongoose'
import mongoose from 'mongoose'

export interface IUser extends User, Document {}

const userSchema = new mongoose.Schema<IUser>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})

export default mongoose.model<IUser>('User', userSchema)
