import type { z } from 'zod'
import type { User } from '~/types/user'
import type { userLoginSchema } from '~/validators/user.validator'

export type SignInInput = z.infer<typeof userLoginSchema>

/**
 * Composable for managing user authentication and session state.
 *
 * Provides methods to sign in, fetch the authenticated user, and expose
 * reactive state such as the current user and authentication status.
 */
export default function useAuth() {
  const headers = useRequestHeaders(['cookie'])

  const user: Ref<User> = useState<User>('user', () => ({} as User))
  const isAuthenticated = computed(() => Boolean(user.value._id))

  const getUserAsync = useAsync(() => $fetch<User>('/api/auth/me', { headers, credentials: 'include' }))
  const signInAsync = useAsync((body: SignInInput) => $fetch<{ success: boolean, message: string }>('/api/auth/login', { method: 'POST', body }))
  const _cloudFrontAuthAsync = useAsync(() => $fetch<any>('/api/auth/cf-auth', { credentials: 'include' }))

  /**
   * Fetches the authenticated user from the API and updates the `user` state.
   *
   * @returns {Promise<void>} Resolves when the user data is fetched and set.
   */
  async function getUser(): Promise<void> {
    const data = await getUserAsync.execute()
    user.value = data as User
  }

  /**
   * Signs in the user using provided credentials, authenticates via CloudFront,
   * and retrieves the authenticated user's data.
   *
   * @param {SignInInput} body - The sign-in credentials matching the userLoginSchema.
   * @returns {Promise<void>} Resolves when the sign-in flow completes.
   */
  async function signIn(body: SignInInput): Promise<void> {
    await signInAsync.execute(body)
    await getUser()
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
