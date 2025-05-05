import process from 'node:process'

export default defineEventHandler(async (event) => {
  setCookie(event, 'sid', 'jos.code2712', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
  })

  return { ok: true }
})
