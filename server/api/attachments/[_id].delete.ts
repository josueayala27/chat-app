import { deleteAttachment, findAttachment } from '~~/server/services/attachment.service'
import { createS3Client, deleteS3Object } from '~~/server/services/s3.service'
import { attachmentIdSchema } from '~~/server/validators/attachment.validator'

export default defineEventHandler(async (event) => {
  const { _id } = await getValidatedRouterParams(event, attachmentIdSchema.parse)

  const attachment = await findAttachment(_id)

  await deleteAttachment(_id)

  const client = createS3Client()
  await deleteS3Object(client, 'attachments/682cbdc9b2160c7eabf49994/685f1b5fa869207e05e6e4e3/willian-justen-de-vasconcellos-sp5TFLhI3hM-unsplash.jpg')

  return {
    message: 'Attachment has been deleted.',
  }
})
