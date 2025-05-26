import type { User } from '~/types/user';
// Assuming SignInForm is defined in SignIn.vue and imported, or use a generic type for body
import type { SignInForm } from '~/components/auth/SignIn.vue'; 

export default function useAuth() {
  const headers = useRequestHeaders(['cookie']);

  const user: Ref<User> = useState<User>('user', () => ({} as User));
  const isAuthenticated = computed(() => Boolean(user.value._id));

  const getUserAsync = useAsync(() => $fetch<User>('/api/auth/me', { headers }));
  // Type hint here should still be <{ success: boolean, message: string }> to match API
  const signInAsync = useAsync((body: SignInForm) => $fetch<{ success: boolean, message: string }>('/api/auth/login', { method: 'POST', body }));

  async function getUser() {
    const data = await getUserAsync.execute();
    user.value = data as User;
  }

  async function signIn(body: SignInForm) { // Changed 'any' to 'SignInForm'
    await signInAsync.execute(body);
    // No getUser() call here
    // No inspection of response.success here
  }

  return {
    user,
    isAuthenticated,
    getUser,
    signIn,

    getSignInLoading: signInAsync.loading,
    getSignInError: signInAsync.error, // This will be set for network/HTTP errors

    getUserLoading: getUserAsync.loading,
    getUserError: getUserAsync.error,
    // getSignInData is NOT exposed here
  };
}
