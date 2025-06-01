import type { Document, Model } from 'mongoose'
import type { Attachment } from '../types/attachment'
import mongoose, { Schema } from 'mongoose'

export interface AttachmentDocument extends Attachment, Document {}

const attachmentSchema: Schema<AttachmentDocument> = new Schema(
  {
    content_type: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    url: { type: String, required: true },

    height: { type: Number },
    width: { type: Number },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
)

export default (mongoose.models.Message as Model<AttachmentDocument>) || mongoose.model<AttachmentDocument>('Attachment', attachmentSchema)
