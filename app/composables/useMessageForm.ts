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
