interface MiddlewareMeta {
  unauthenticatedOnly: boolean
}

declare module '#app' {
  interface PageMeta {
    auth?: MiddlewareMeta
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    auth?: MiddlewareMeta
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client)
    return

  const { isAuthenticated, getUser, user } = useAuth()

  const isGuestMode: boolean = to.meta.auth?.unauthenticatedOnly || false

  if (!isAuthenticated.value) {
    await getUser()

    if (isGuestMode && user.value) {
      return navigateTo({ name: 'index' })
    }
    else if (!isGuestMode && !user.value) {
      return navigateTo({ name: 'sign-in' })
    }
  }
})
