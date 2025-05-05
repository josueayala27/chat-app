export default defineEventHandler((event) => {
  console.log('BE: Auth Middleware')

  const sid = getCookie(event, 'sid')

  if (!sid) {
    throw createError({ statusCode: 401, statusMessage: 'Not authenticated.' })
  }

  event.context.user = { sid: '' }
})
