import type { Message } from '~/types/message'

export default function useTempMessage() {
  const temp = ref<Message[]>([])

  return { temp }
}
