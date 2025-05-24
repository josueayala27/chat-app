import type { User } from '~/types/user'

export default function useAuth() {
  const headers = useRequestHeaders(['cookie'])

  const user: Ref<User> = useState<User>('user', () => ({} as User))
  const isAuthenticated = computed(() => Boolean(user.value._id))

  const getUserAsync = useAsync(() => $fetch<User>('/api/auth/me', { headers }))

  async function getUser() {
    const data = await getUserAsync.execute()
    user.value = data as User
  }

  return { user, isAuthenticated, getUser, getUserLoading: getUserAsync.loading, getUserError: getUserAsync.error }
}
