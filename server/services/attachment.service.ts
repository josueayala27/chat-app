import type { z } from 'zod'
import type { AttachmentDocument } from '../models/Attachment'
import type { Attachment as IAttachment } from '../types/attachment'
import type { attachmentCreateSchema } from '../validators/attachment.validator'
import Attachment from '../models/Attachment'

/**
 * Input type for creating an attachment.
 * Combines validated schema fields with the attachment's URL.
 */
export type CreateAttachmentInput = z.infer<typeof attachmentCreateSchema> & Pick<IAttachment, 'url' | 'system_filename'>

/**
 * Persists a new attachment in the database.
 *
 * @param {CreateAttachmentInput} body - Attachment data, including validated fields and file URL.
 * @returns {Promise<AttachmentDocument>} The created attachment document.
 */
export function createAttachment(body: CreateAttachmentInput): Promise<AttachmentDocument> {
  return Attachment.create(body)
}
