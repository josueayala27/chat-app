import { createAttachment } from '~~/server/services/attachment.service'
import { attachmentCreateSchema } from '~~/server/validators/attachment.validator'
import { messageParamSchema } from '~~/server/validators/message.validator'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, messageParamSchema.parse)
  const body = await readValidatedBody(event, attachmentCreateSchema.parse)

  const { createClient, createSignedUploadURL } = useAws()

  const attachment = await createAttachment(body)

  const client = createClient()

  const url = await createSignedUploadURL(client, ['attachments', params.chat, attachment._id, body.file_name].join('/'))

  return { upload_url: url }
})
