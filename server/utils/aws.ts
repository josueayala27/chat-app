import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export function useAws() {
  const config = useRuntimeConfig()

  /**
   * Creates and configures an S3 client using runtime credentials.
   *
   * @returns {S3Client} A configured S3Client instance.
   */
  function createClient(): S3Client {
    const client = new S3Client({
      region: 'us-east-1',
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
  async function createSignedUploadURL(client: S3Client, key: string): Promise<string> {
    const command = new PutObjectCommand({ Bucket: config.AWS_BUCKET_NAME, Key: key })
    return getSignedUrl(client, command, { expiresIn: 300 })
  }

  return { createClient, createSignedUploadURL }
}
