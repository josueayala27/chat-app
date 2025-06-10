export function useChat() {
  const route = useRoute('chat')
  const headers = useRequestHeaders(['cookie'])

  const chat = useState(route.params.chat, () => ({}))
  const chats = useState<any>('chats', () => [])

  const getAsyncConversation = useAsync(() => $fetch(`/api/chats/${route.params.chat as string}/messages`, {
    method: 'GET',
    headers,
  }))

  async function getChats() {
    const _chats = await $fetch<any>('/api/chats', { headers })
    chats.value = _chats

    return _chats
  }

  async function getConversation() {
    const response = getAsyncConversation.execute()
    chat.value = response
  }

  return { chats, getChats, getConversation }
}
