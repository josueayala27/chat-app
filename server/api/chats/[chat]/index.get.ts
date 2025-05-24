import { getChatById } from '~~/server/services/chat.service'
import { messageParamSchema } from '~~/server/validators/message.validator'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, messageParamSchema.parse)
  return getChatById({ chat_id: params.chat, user: event.context.user })
})
