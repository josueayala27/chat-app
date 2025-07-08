import type { Attachment } from '~/types/attachment'
import type { ChatMessage, Message } from '~/types/message'
import { nanoid } from 'nanoid'

/**
 * Composable for handling message sending in a specific chat channel.
 * @param {string} channel - The ID of the chat channel.
 */
export default function useMessage(channel: string) {
  const { enqueue } = useTaskQueue()
  const { user } = useAuth()
  const { addTempMessage, updateTempMessage } = useChat()

  /**
   * Async function to send a message to the server using $fetch.
   * Uses `useAsync` to manage async state.
   *
   * @param {Pick<Message, 'content'> & { attachments: string[] }} body - The message content and attachment IDs.
   * @returns {Promise<ChatMessage>} The message returned from the server.
   */
  const sendAsync = useAsync((body: Pick<Message, 'content'> & { attachments: string[] }) =>
    $fetch<ChatMessage>(`/api/chats/${channel}/messages`, {
      method: 'POST',
      body: {
        type: 'text',
        content: body.content,
        attachments: body.attachments,
      },
    }))

  /**
   * Creates a temporary message object for immediate UI feedback.
   *
   * @param {Partial<ChatMessage>} data - Partial data to populate the temporary message.
   * @returns {ChatMessage} The generated temporary message object.
   */
  function createTempMessage(data: Partial<ChatMessage>): ChatMessage {
    const message: ChatMessage = {
      ...data,
      _id: `temp-${nanoid(32)}`,
      read_by: [{ read_at: new Date().toString(), user_id: user.value._id }],
      sender_id: user.value,
      chat_id: channel,
      type: 'text',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),

    }

    return message
  }

  /**
   * Sends a message containing text content and/or attachments.
   * First adds a temporary message for immediate UI feedback,
   * then enqueues the actual sending process and updates the temporary message once confirmed by the server.
   *
   * @param {Pick<Message, 'content'> & { attachments: Pick<Attachment, '_id' | 'key'>[] }} data - Message content and attachment metadata.
   * @returns {Promise<void>}
   */
  async function sendContentOrAttachment(data: Pick<Message, 'content'> & { attachments: Pick<Attachment, '_id' | 'key'>[] }): Promise<void> {
    const temp = createTempMessage({
      content: data.content,
      attachments: data.attachments.map(el => ({ ...el } as Attachment)),
    })

    addTempMessage(temp)

    enqueue(async () => {
      const message = await sendAsync.execute({
        content: data.content,
        attachments: data.attachments.map(el => el._id),
      })

      if (message) {
        updateTempMessage(temp._id, message)
      }
    })
  }

  return {
    sendContentOrAttachment,
  }
}
