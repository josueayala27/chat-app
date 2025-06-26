import { Buffer } from 'node:buffer'
import { getSignedCookies } from 'aws-cloudfront-sign'

const IN_HOUR_IN_SECONDS = 60 * 60

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const cookies = getSignedCookies(`${config.CLOUDFRONT_DOMAIN}/*`, {
    keypairId: config.CLOUDFRONT_KEY_PAIR_ID,
    privateKeyString: Buffer.from(config.CLOUDFRONT_PRIVATE_KEY, 'base64').toString('utf-8'),
  })

  for (const [name, value] of Object.entries(cookies)) {
    setCookie(event, name, value, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: IN_HOUR_IN_SECONDS,
      domain: '.parly.chat',
    })
  }

  return { ok: true }
})
