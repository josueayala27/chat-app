import type { ChatMessage, Message } from '~/types/message'
import { customAlphabet } from 'nanoid'

const nano = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 24)

export default function useMessage(channel: string) {
  const { validate, values, resetField } = useForm<{ content: string }>({ name: 'chat-message' })
  const { enqueue } = useTaskQueue()
  const { user } = useAuth()

  const sendAsync = useAsync((content: string) => $fetch<Message>(`/api/chats/${channel}/messages`, {
    method: 'POST',
    body: {
      type: 'text',
      content,
      attachments: ['686183a0124352b5a998d882', '6861d46abfe9eaeb9ab4ffba'],
    },
  }))

  function createTempMessage({ chat_id, content }: Pick<ChatMessage, 'chat_id' | 'content'>): ChatMessage {
    const message: ChatMessage & { status: 'pending' | 'sent' | 'error' } = {
      _id: `temp-${nano()}`,
      attachments: [],
      chat_id,
      content,
      created_at: new Date().toISOString(),
      read_by: [],
      sender_id: user.value,
      type: 'text',
      updated_at: new Date().toISOString(),
      status: 'pending',
    }

    return message
  }

  async function send() {
    const { valid } = await validate()

    if (valid) {
      const content = values.content.trim()
      resetField('content')

      console.log(createTempMessage({ chat_id: channel, content }))

      enqueue(async () => {
        await sendAsync.execute(content)
      })
    }
  }

  return {
    send,
  }
}
