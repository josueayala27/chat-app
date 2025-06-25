import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
  })

  const command = new PutObjectCommand({
    Bucket: 'nimble-cloud-assets-7421',
    Key: 'Customizable Font Scheme.png',
  })

  const url = await getSignedUrl(client, command, { expiresIn: 3600 })

  return {
    message: url,
  }
})
