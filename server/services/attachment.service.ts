import type { z } from 'zod'
import type { Attachment as IAttachment } from '../types/attachment'
import type { attachmentCreateSchema } from '../validators/attachment.validator'
import Attachment from '../models/Attachment'

export type CreateAttachmentInput = z.infer<typeof attachmentCreateSchema> & Pick<IAttachment, 'url'>

export function createAttachment(body: CreateAttachmentInput) {
  return Attachment.create(body)
}
