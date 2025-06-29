// export function useMessageForm(chatId: string) {
//   const { values, validate, resetForm } = useForm<{ content: string }>({ name: 'chat-footer' })
//   const { createTempMessage, updateTempMessage } = useChat()
//   const { enqueue } = useUploadQueue()

//   async function send() {
//     const { valid } = await validate()
//     if (!valid)
//       return

//     const content = values.content.trim()
//     resetForm()

//     const { _id } = createTempMessage({ chat_id: chatId, content })

//     enqueue(async () => {
//       const msg = await $fetch(`/api/chats/${chatId}/messages`, {
//         method: 'POST',
//         body: { type: 'text', content },
//       })
//       updateTempMessage(_id, msg as ChatMessage)
//     })
//   }

//   return { values, send }
// }

export default function useMessage(channel: string) {
  const { validate, values, resetField } = useForm<{ content: string }>({ name: 'chat-message' })
  const { enqueue } = useTaskQueue()

  const sendAsync = useAsync((content: string) => $fetch(`/api/chats/${channel}/messages`, {
    method: 'POST',
    body: {
      type: 'text',
      content,
    },
  }))

  async function send() {
    const { valid } = await validate()

    if (valid) {
      const content = values.content.trim()
      resetField('content')

      enqueue(async () => {
        await sendAsync.execute(content)
      })
    }
  }

  return {
    send,
  }
}
