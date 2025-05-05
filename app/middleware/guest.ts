export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.client)
    return

  try {
    console.log('FE: Guest Middleware')

    const { user } = useAuth()

    if (!user.value) {
      const data = await $fetch('/api/auth/me')

      user.value = data

      if (user) {
        return navigateTo({ name: 'index' })
      }
    }
  }
  catch (error) {
    console.error('FE: Guest Middleware Error:', error)
    return true
  }
})
