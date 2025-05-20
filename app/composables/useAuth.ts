interface IUser extends User {
  _id: string
}

export default function useAuth() {
  const headers = useRequestHeaders(['cookie'])

  const user = useState<IUser>('user', () => ({} as IUser))
  const isAuthenticated = computed(() => Boolean(user.value._id))

  const getUserAsync = useAsync(() => $fetch('/api/auth/me', { headers }))

  async function getUser() {
    const data = await getUserAsync.execute()
    user.value = data
  }

  return { user, isAuthenticated, getUser, getUserLoading: getUserAsync.loading, getUserError: getUserAsync.error }
}
