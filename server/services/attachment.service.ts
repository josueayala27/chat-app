import type { z } from 'zod'
import type { AttachmentDocument } from '../models/Attachment'
import type { attachmentCreateSchema, attachmentDeleteSchema, attachmentReadSchema } from '../validators/attachment.validator'
import Attachment from '../models/Attachment'

/**
 * Input type for creating an attachment.
 * Combines validated schema fields with the attachment's URL.
 */
export type CreateAttachmentInput = z.infer<typeof attachmentCreateSchema>
type DeleteAttachmentInput = z.infer<typeof attachmentDeleteSchema>
type FindAttachmentInput = z.infer<typeof attachmentReadSchema>

/**
 * Persists a new attachment in the database.
 *
 * @param {CreateAttachmentInput} body - Attachment data, including validated fields and file URL.
 * @returns {Promise<AttachmentDocument>} The created attachment document.
 */
export function createAttachment(body: CreateAttachmentInput): Promise<AttachmentDocument> {
  return Attachment.create(body)
}

export function deleteAttachment(input: DeleteAttachmentInput['_id']) {
  return Attachment.deleteOne({ _id: input })
}

export function findAttachment(input: FindAttachmentInput['_id']) {
  return Attachment.findById(input)
}
