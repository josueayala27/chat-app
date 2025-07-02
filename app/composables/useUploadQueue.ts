import pLimit from 'p-limit'

const limit = pLimit(3)

export function useUploadQueue() {
  function enqueue(task: () => Promise<void>) {
    return limit(task)
  }

  return { enqueue }
}
