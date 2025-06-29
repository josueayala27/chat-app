import { createAttachment } from '~~/server/services/attachment.service'
import { createS3Client, createS3SignedUploadURL } from '~~/server/services/s3.service'
import { attachmentCreateSchema } from '~~/server/validators/attachment.validator'
import { messageParamSchema } from '~~/server/validators/message.validator'

export default defineEventHandler(async (event) => {
  // TODO: Create a new params validator for attachment :)
  const params = await getValidatedRouterParams(event, messageParamSchema.parse)
  const body = await readValidatedBody(event, attachmentCreateSchema.parse)

  const attachment = await createAttachment(body)

  const key = ['attachments', params.chat, attachment._id, body.file_name].join('/')

  const client = createS3Client()
  const url = await createS3SignedUploadURL(client, key)

  return { _id: attachment._id, key, upload_url: url }
})
