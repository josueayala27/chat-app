import { createChat } from '~~/server/services/chat.service'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await createChat(body)
})
