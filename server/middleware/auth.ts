export default defineEventHandler((event) => {
  if (!isProtected(getRequestURL(event).pathname))
    return

  console.log('🔒 BE: Auth Middleware')

  const sid = getCookie(event, 'sid')

  if (!sid) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' })
  }

  event.context.user = sid
})
