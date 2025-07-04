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

  /**
   * Fetches all chat channels for the user.
   *
   * @async
   * @function getChats
   * @returns {Promise<ChatState>} Resolves with a map of channel IDs to message arrays.
   */
  async function getChats(): Promise<ChatState> {
    const _chats = await $fetch<any>('/api/chats', { headers })
    chats.value = _chats

    return _chats
  }

  /**
   * Fetches messages before a given cursor and prepends them to existing messages.
   *
   * @async
   * @function getBeforeConversation
   * @param {string} [before] - The cursor ID to fetch messages before.
   * @returns {Promise<void>} Resolves when prepended or if no new data.
   */
  async function getBeforeConversation(before?: string): Promise<void> {
    const channel = `channel:${route.params.chat}`

    const response = await getAsyncConversation.execute({ before })
    if (!response || response.length === 0)
      return

    const nextCursor = response.at(-1)!._id
    cursors.value[channel] = nextCursor

    chats.value[channel] = concat(response, chats.value[channel] || [])
  }

  /**
   * Loads the initial set of messages for the current channel if not already loaded.
   *
   * @async
   * @function getConversation
   * @returns {Promise<void>} Resolves when messages are loaded or if already present.
   */
  async function getConversation(): Promise<void> {
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

  /**
   * Appends a new message to the end of the current channel's message list.
   *
   * @function addLastMessage
   * @param {ChatMessage} message - The chat message to append.
   * @returns {void}
   */
  function addLastMessage(message: ChatMessage): void {
    const channel = `channel:${route.params.chat}`

    chats.value[channel] = [
      ...(toRaw(chats.value[channel]) || []),
      message,
    ]
  }

  function addTempMessage(message: ChatMessage) {
    const channel = `channel:${route.params.chat}`
    chats.value[channel] = [...(toRaw(chats.value[channel]) || []), message]
  }

  function updateTempMessage(tempId: string, message: ChatMessage): void {
    const channel = `channel:${route.params.chat}`

    chats.value[channel] = (toRaw(chats.value[channel]) || []).map((m) => {
      if (m._id === tempId) {
        return { ...m, ...message }
      }

      return m
    })
  }

  return {
    chats,
    cursors,
    getChats,
    getConversation,
    getBeforeConversation,
    addLastMessage,
    addTempMessage,
    updateTempMessage,
  }
}
