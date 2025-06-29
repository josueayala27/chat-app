import { useRuntimeConfig } from '#imports'

/**
 * Constructs a signed CloudFront URL for an S3 object with resize parameters.
 *
 * @param key - The S3 object key (path in the bucket).
 * @param width - Target width for the resized image.
 * @param height - Target height for the resized image.
 * @returns A fully-qualified CloudFront URL encoding bucket, key, and resize edits.
 */
export function buildURL(key: string, width: number, height: number): string {
  const { public: config } = useRuntimeConfig()
  const url = btoa(JSON.stringify({
    bucket: config.AWS_BUCKET,
    key,
    edits: {
      resize: {
        width,
        height,
      },
    },
  }))
  return `${config.CLOUDFRONT_DOMAIN}/${url}`
}

/**
 * Preloads an image by creating an HTMLImageElement and resolving when it's ready.
 *
 * @param src - URL of the image to preload.
 * @returns A promise that resolves with the loaded image element or rejects on error.
 */
export function preload(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}
