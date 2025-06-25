import { Buffer } from 'node:buffer'
import process from 'node:process'
import { getSignedCookies } from 'aws-cloudfront-sign'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const cookies = getSignedCookies(`${config.CLOUDFRONT_DOMAIN}/*`, {
    keypairId: config.CLOUDFRONT_KEY_PAIR_ID,
    privateKeyString: Buffer.from(config.CLOUDFRONT_PRIVATE_KEY, 'base64').toString('utf-8'),
  })

  for (const [name, value] of Object.entries(cookies)) {
    setCookie(event, name, value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60,
    })
  }

  return { ok: true }
})
