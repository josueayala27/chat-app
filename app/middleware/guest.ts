export default defineNuxtRouteMiddleware(async () => {
  console.log('FE: Guest Middleware')

  const { user } = useAuth()

  if (!user.value) {
    const data = await $fetch('/api/auth/me')

    user.value = data

    if (user) {
      return navigateTo({ name: 'index' })
    }
  }
})
