export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server)
    return

  const { ably, init } = useAbly()

  if (!ably.value) {
    init()
  }
})
