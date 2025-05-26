import type { User } from '~/types/user'

export default function useAuth() {
  const headers = useRequestHeaders(['cookie'])

  const user: Ref<User> = useState<User>('user', () => ({} as User))
  const isAuthenticated = computed(() => Boolean(user.value._id))

  const getUserAsync = useAsync(() => $fetch<User>('/api/auth/me', { headers }))

  // TODO: body type
  const signInAsync = useAsync((body: any) =>
    $fetch<{ success: boolean, message: string }>('/api/auth/login', { method: 'POST', body }))

  async function getUser() {
    const data = await getUserAsync.execute()
    user.value = data as User
  }

  // TODO: body type
  async function signIn(body: any) {
    await signInAsync.execute(body)
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
