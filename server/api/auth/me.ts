export default defineEventHandler((event) => {
  console.log('/me')
  return event.context.user || null
})
