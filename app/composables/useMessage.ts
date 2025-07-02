import type { ChatMessage, Message } from '~/types/message'
import { customAlphabet } from 'nanoid'

const nano = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 24)

type MessageStatus = 'pending' | 'sent' | 'error'

export default function useMessage(channel: string) {
  const { validate, values, resetField } = useForm<{ content: string }>({ name: 'chat-message' })
  const { enqueue } = useTaskQueue()
  const { user } = useAuth()

  const sendAsync = useAsync((body: { content: string; attachments: string[] }) => $fetch<Message>(`/api/chats/${channel}/messages`, {
    method: 'POST',
    body: {
      type: 'text',
      content: body.content,
      attachments: body.attachments,
    },
  }))

  function createTempMessage({ attachments = [], chat_id, content }: Pick<ChatMessage, 'chat_id' | 'content' | 'attachments'>): ChatMessage {
    const message: ChatMessage & { status: MessageStatus } = {
      _id: `temp-${nano()}`,
      attachments,
      chat_id,
      content,
      read_by: [],
      sender_id: user.value,
      type: 'text',
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    return message
  }

  async function send(attachments: string[] = []) {
    const { valid } = await validate()

    if (valid) {
      const content = values.content.trim()
      resetField('content')

      console.log(createTempMessage({ chat_id: channel, content, attachments }))

      enqueue(async () => {
        await sendAsync.execute({ content, attachments })
      })
    }
  }

  return {
    send,
  }
}
