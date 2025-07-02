import { useRuntimeConfig } from '#imports'

/**
 * Constructs a signed CloudFront URL for an S3 object with resize parameters.
 *
 * @param key - The S3 object key (path in the bucket).
 * @param params -
 * @returns A fully-qualified CloudFront URL encoding bucket, key, and resize edits.
 */
export function buildURL(key: string, params: any): string {
  const { public: config } = useRuntimeConfig()
  const url = btoa(JSON.stringify({
    bucket: config.AWS_BUCKET,
    key,
    edits: params,
  }))
  return `${config.CLOUDFRONT_DOMAIN}/${url}`
}
