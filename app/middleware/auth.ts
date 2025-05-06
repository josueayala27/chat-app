export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.client)
    return

  try {
    console.log('FE: Auth Middleware')

    const headers = useRequestHeaders(['cookie'])
    const { user } = useAuth()

    if (!user.value) {
      const data = await $fetch('/api/auth/me', { headers })

      user.value = data
    }

    if (!user.value) {
      return navigateTo({ name: 'sign-in' })
    }
  }
  catch (error) {
    console.error('FE: Auth Middleware Error:', error)
    return navigateTo({ name: 'sign-in' })
  }
})
