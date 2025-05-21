import { createMessage } from '~~/server/services/message.service'
import { createMessageBodySchema, messageParamSchema } from '~~/server/validators/message.validator'

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, messageParamSchema.parse)
  const body = await readValidatedBody(event, createMessageBodySchema.parse)

  return await createMessage({ ...body, chat_id: params.chat, user: event.context.user })
})
