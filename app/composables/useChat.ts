import type { ChatMessage } from '~/types/message'
import { concat } from 'remeda'

export type ChatState = Record<string, ChatMessage[]>
export type CursorState = Record<string, string>

export function useChat() {
  const route = useRoute('chat')
  const headers = useRequestHeaders(['cookie'])

  const cursors = useState<CursorState>('cursors', () => ({}))
  const chats = useState<ChatState>('chats', () => ({}))

  const getAsyncConversation = useAsync(query => $fetch<ChatMessage[]>(`/api/chats/${route.params.chat as string}/messages`, {
    method: 'GET',
    query,
    headers,
  }))

  async function getChats() {
    const _chats = await $fetch<any>('/api/chats', { headers })
    chats.value = _chats

    return _chats
  }

  async function getBeforeConversation(before?: string) {
    const channel = `channel:${route.params.chat}`

    const response = await getAsyncConversation.execute({ before })
    if (!response || response.length === 0)
      return

    const nextCursor = response.at(-1)!._id
    cursors.value[channel] = nextCursor

    chats.value[channel] = concat(response, chats.value[channel] || [])
  }

  async function getConversation() {
    const channel = `channel:${route.params.chat}`

    if (!chats.value[channel]) {
      const response = await getAsyncConversation.execute({})

      if (!response || response.length === 0)
        return

      const nextCursor = response.at(-1)!._id
      cursors.value[channel] = nextCursor

      chats.value[channel] = response
    }
  }

  function concatRecentMessage(message: ChatMessage) {
    const channel = `channel:${route.params.chat}`
    chats.value[channel] = concat(chats.value[channel] || [], [message])

    console.log(chats.value[channel])
  }

  return { chats, cursors, getChats, getConversation, getBeforeConversation, concatRecentMessage }
}
