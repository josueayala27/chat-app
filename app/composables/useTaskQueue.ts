export function useTaskQueue() {
  /**
   * A reactive reference to a Promise used to queue asynchronous tasks.
   * Ensures that tasks are executed sequentially.
   * @type {Ref<Promise<void>>}
   */
  const queue: Ref<Promise<void>> = ref<Promise<void>>(Promise.resolve())

  /**
   * Queue a task: it will be executed when the previous one finishes.
   */
  function enqueue(task: () => Promise<void>) {
    queue.value = queue.value
      .then(() => task())
      .catch(() => console.error('🚨 [Task Queue] task failed:'))
  }

  return { enqueue }
}
