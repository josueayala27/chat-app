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
