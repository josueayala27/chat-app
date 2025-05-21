import { getMessages } from '~~/server/services/message.service'
import { messageParamSchema } from '~~/server/validators/message.validator'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, messageParamSchema.parse)

  return await getMessages({ chat_id: params.chat })
})
