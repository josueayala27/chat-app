import { createMessage } from '~~/server/services/message.service'

export default defineEventHandler(async (event) => {
  const param = getRouterParam(event, 'chat')

  const body = await readBody<{ chat_id: string, content: string, type: string }>(event)
  const user = event.context.user

  await createMessage()

  return message
})
