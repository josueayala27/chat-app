export function useChat() {
  const headers = useRequestHeaders(['cookie'])

  const chats = useState<any>('chats', () => [])

  async function getChats() {
    const _chats = await $fetch<any>('/api/chats', { headers })
    chats.value = _chats

    return _chats
  }

  return { chats, getChats }
}
