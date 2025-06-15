import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { attachmentCreateSchema } from '~~/server/validators/attachment.validator'

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, attachmentCreateSchema.parse)

  const config = useRuntimeConfig()

  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
  })

  const command = new PutObjectCommand({ Bucket: config.AWS_BUCKET_NAME, Key: body.filename })

  const url = await getSignedUrl(client, command, { expiresIn: 3600 })

  return { upload_url: url }
})
