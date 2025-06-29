import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const config = useRuntimeConfig()

/**
 * Creates and configures an S3 client using runtime credentials.
 *
 * @returns {S3Client} A configured S3Client instance.
 */
export function createS3Client(): S3Client {
  const client = new S3Client({
    region: config.AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: config.AWS_ACCESS_KEY_ID,
      secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    },
  })

  return client
}

/**
 * Generates a pre-signed URL for uploading an object to S3.
 *
 * @param {S3Client} client - An S3Client instance created via createClient().
 * @param {string} key - The object key (path and filename) within the bucket.
 * @returns {Promise<string>} A pre-signed URL valid for the configured expiration period.
 */
export async function createS3SignedUploadURL(client: S3Client, key: string): Promise<string> {
  // TODO: Add `ContentType`
  const command = new PutObjectCommand({ Bucket: config.public.AWS_BUCKET, Key: key })
  return getSignedUrl(client, command, { expiresIn: 60 * 5 })
}

export async function deleteS3Object(client: S3Client, key: string): Promise<void> {
  console.log(key)

  const command = new DeleteObjectCommand({ Bucket: config.public.AWS_BUCKET, Key: key })
  await client.send(command)
}
