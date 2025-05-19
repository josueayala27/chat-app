import mongoose from 'mongoose'

const fields = {
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
}

const UserSchema = new mongoose.Schema(fields, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)
