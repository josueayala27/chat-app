export function useTaskQueue() {
  const queue = ref<Promise<void>>(Promise.resolve())

  /**
   * Queue a task: it will be executed when the previous one finishes.
   */
  function enqueue(task: () => Promise<void>) {
    queue.value = queue.value
      .then(() => task())
      .catch((err) => {
        console.error('[TaskQueue] task failed:', err)
        // we do not break the queue on error
      })
  }

  return { enqueue }
}
