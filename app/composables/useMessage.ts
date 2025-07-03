import type { Attachment } from '~/types/attachment'
import type { ChatMessage, Message } from '~/types/message'
import { nanoid } from 'nanoid'

type MessageStatus = 'pending' | 'sent' | 'error'

export default function useMessage(channel: string) {
  const { enqueue } = useTaskQueue()
  const { user } = useAuth()

  const sendAsync = useAsync((body: Pick<Message, 'content'> & { attachments: string[] }) =>
    $fetch<Message>(`/api/chats/${channel}/messages`, {
      method: 'POST',
      body: {
        type: 'text',
        content: body.content,
        attachments: body.attachments,
      },
    }))

  function createTempMessage(data: Partial<ChatMessage>) {
    const message: ChatMessage & { status: MessageStatus } = {
      ...data,
      _id: `temp-${nanoid(32)}`,
      read_by: [{ read_at: new Date().toString(), user_id: user.value._id }],
      sender_id: user.value,
      chat_id: channel,
      // TODO: This property should be removed
      type: 'text',
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),

    }

    return message
  }

  async function sendContentOrAttachment(data: Pick<Message, 'content'> & { attachments: Pick<Attachment, '_id' | 'key'>[] }) {
    console.log(createTempMessage({
      content: data.content,
      attachments: data.attachments.map(el => ({ ...el } as Attachment)),
    }))

    enqueue(async () => {
      await sendAsync.execute({
        content: data.content,
        attachments: data.attachments.map(el => el._id),
      })
    })
  }

  return {
    sendContentOrAttachment,
  }
}
