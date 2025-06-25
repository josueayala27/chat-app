import { attachmentCreateSchema } from '~~/server/validators/attachment.validator'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, attachmentCreateSchema.parse)
  const { createClient, createSignedUploadURL } = useAws()

  const client = createClient()
  const url = await createSignedUploadURL(client, body.filename)

  return { upload_url: url }
})
