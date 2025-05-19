import mongoose from 'mongoose'

const fields = {
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}

const UserSchema = new mongoose.Schema(fields, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
