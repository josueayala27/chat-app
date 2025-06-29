import pLimit from 'p-limit'

const limit = pLimit(3)

export function useUploadQueue() {
  const taskQueue = ref(Promise.resolve())

  function enqueue(task: () => Promise<void>) {
    taskQueue.value = taskQueue.value.then(() => limit(task))
  }

  return { enqueue }
}
