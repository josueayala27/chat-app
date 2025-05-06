export default defineEventHandler((event) => {
  const pathname = getRequestURL(event).pathname

  if (!isProtected(pathname))
    return

  console.log('BE: Auth Middleware')

  const sid = getCookie(event, 'sid')

  if (!sid) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized.' })
  }

  event.context.user = { sid }
})
