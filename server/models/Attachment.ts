import type { Document, Model } from 'mongoose'
import type { Attachment } from '../types/attachment'
import mongoose, { Schema } from 'mongoose'

export interface AttachmentDocument extends Attachment, Document {}

const imageMetaSchema = new Schema(
  {
    width: Number,
    height: Number,
  },
  { _id: false },
)

const audioMetaSchema = new Schema(
  {
    duration: Number,
    bitrate: Number,
  },
  { _id: false },
)

const documentMetaSchema = new Schema(
  {
    pages: Number,
  },
  { _id: false },
)

const attachmentBaseSchema: Schema<AttachmentDocument> = new Schema(
  {
    sha256: { type: String, required: true, unique: true, index: true },
    key: { type: String, required: true },

    content_type: { type: String, required: true },
    file_name: { type: String, required: true },
    size: { type: Number, required: true },

    sender_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ref_count: { type: Number, default: 1 },

    meta: { type: Schema.Types.Mixed },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    discriminatorKey: 'content_type',
  },
)

const AttachmentModel = (mongoose.models.Attachment as Model<AttachmentDocument>) || mongoose.model<AttachmentDocument>('Attachment', attachmentBaseSchema)

AttachmentModel.discriminator(
  'image',
  new Schema({ meta: imageMetaSchema }, { _id: false }),
)

AttachmentModel.discriminator(
  'audio',
  new Schema({ meta: audioMetaSchema }, { _id: false }),
)

AttachmentModel.discriminator(
  'application/pdf',
  new Schema({ meta: documentMetaSchema }, { _id: false }),
)

export default AttachmentModel
