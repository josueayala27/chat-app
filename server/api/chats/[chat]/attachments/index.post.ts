import type { AttachmentDocument } from '~~/server/models/Attachment'
import Attachment from '~~/server/models/Attachment'
import { createAttachment } from '~~/server/services/attachment.service'
import { createS3Client, createS3SignedUploadURL } from '~~/server/services/s3.service'
import { attachmentCreateSchema } from '~~/server/validators/attachment.validator'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, attachmentCreateSchema.parse)

  let attachment: AttachmentDocument | null = await Attachment.findOneAndUpdate(
    { sha256: body.sha256 },
    { $inc: { ref_count: 1 } },
    { new: true },
  )

  if (!attachment) {
    const key = `attachments/${body.sha256.slice(0, 2)}/${body.sha256}/${body.file_name}`

    const client = createS3Client()
    const upload_url = await createS3SignedUploadURL(client, key)

    attachment = await createAttachment({
      ...body,
      key,
      user: event.context.user,
    })

    return {
      _id: attachment._id,
      key: attachment.key,
      upload_url,
    }
  }

  return {
    _id: attachment._id,
    key: attachment.key,
    upload_url: null,
  }
})
