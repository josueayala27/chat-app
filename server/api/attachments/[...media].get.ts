import { Buffer } from 'node:buffer'
import { getSignedUrl } from 'aws-cloudfront-sign'
import { joinURL } from 'ufo'

export default defineEventHandler(async (event) => {
  const param = getRouterParam(event, 'media')
  const config = useRuntimeConfig()

  const url = getSignedUrl(joinURL(config.CLOUDFRONT_DOMAIN, param as string), {
    keypairId: config.CLOUDFRONT_KEY_PAIR_ID,
    privateKeyString: Buffer.from(config.CLOUDFRONT_PRIVATE_KEY, 'base64').toString('utf-8'),
  })

  return { url }
})
