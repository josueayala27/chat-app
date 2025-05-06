export function useAsync<TArgs extends any[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
) {
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const execute = async (...args: TArgs): Promise<TResult | undefined> => {
    loading.value = true
    error.value = null
    try {
      return await fn(...args)
    }
    catch (err: any) {
      error.value = err
    }
    finally {
      loading.value = false
    }
  }

  return { execute, loading: loading as Ref<boolean>, error: error as Ref<Error | null> }
}
