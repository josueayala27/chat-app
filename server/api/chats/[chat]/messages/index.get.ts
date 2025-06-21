import { getMessages } from '~~/server/services/message.service'
import { getMessagesQuerySchema, messageParamSchema } from '~~/server/validators/message.validator'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, messageParamSchema.parse)
  const query = await getValidatedQuery(event, getMessagesQuerySchema.parse)

  return getMessages({ chat_id: params.chat, before: query.before, after: query.after })
})
