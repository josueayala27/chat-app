export default defineNuxtRouteMiddleware(async () => {
  console.log('FE: Auth Middleware')

  const { user } = useAuth()

  if (!user.value) {
    const data = await $fetch('/api/auth/me')

    user.value = data
  }

  if (!user.value) {
    return navigateTo({ name: 'sign-in' })
  }
})
