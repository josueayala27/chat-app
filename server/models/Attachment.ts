import type { Document, Model } from 'mongoose'
import type { Attachment } from '../types/attachment'
import mongoose, { Schema } from 'mongoose'

export interface AttachmentDocument extends Attachment, Document {}

const attachmentSchema: Schema<AttachmentDocument> = new Schema(
  {
    sha256: { type: String, required: true, unique: true, index: true },
    content_type: { type: String, required: true },
    file_name: { type: String, required: true },
    size: { type: Number, required: true },
    sender_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

export default (mongoose.models.Message as Model<AttachmentDocument>) || mongoose.model<AttachmentDocument>('Attachment', attachmentSchema)
