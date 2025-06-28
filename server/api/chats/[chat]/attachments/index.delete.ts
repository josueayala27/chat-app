import { createAttachment } from '~~/server/services/attachment.service'
import { createS3Client, createSignedUploadURL } from '~~/server/services/s3.service'
import { attachmentCreateSchema } from '~~/server/validators/attachment.validator'
import { messageParamSchema } from '~~/server/validators/message.validator'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, messageParamSchema.parse)
  const body = await readValidatedBody(event, attachmentCreateSchema.parse)

  const attachment = await createAttachment(body)

  const key = ['attachments', params.chat, attachment._id, body.file_name].join('/')

  const client = createS3Client()
  const url = await createSignedUploadURL(client, key)

  return { key, upload_url: url }
})
