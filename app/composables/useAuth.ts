import type { z } from 'zod'
import type { User } from '~/types/user'
import type { userLoginSchema } from '~/validators/user.validator'

export type SignInInput = z.infer<typeof userLoginSchema>

export default function useAuth() {
  const headers = useRequestHeaders(['cookie'])

  const user: Ref<User> = useState<User>('user', () => ({} as User))
  const isAuthenticated = computed(() => Boolean(user.value._id))

  const getUserAsync = useAsync(() => $fetch<User>('/api/auth/me', { headers }))

  const signInAsync = useAsync((body: SignInInput) =>
    $fetch<{ success: boolean, message: string }>('/api/auth/login', { method: 'POST', body }))
  const cloudFrontAuthAsync = useAsync(() => $fetch('/api/auth/cf-auth', { credentials: 'include' }))

  async function getUser() {
    const data = await getUserAsync.execute()
    user.value = data as User
  }

  async function signIn(body: SignInInput) {
    await signInAsync.execute(body)
    await cloudFrontAuthAsync.execute()
  }

  return {
    user,
    isAuthenticated,
    getUser,
    signIn,

    getSignInLoading: signInAsync.loading,
    getSignInError: signInAsync.error,

    getUserLoading: getUserAsync.loading,
    getUserError: getUserAsync.error,
  }
}
