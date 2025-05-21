import { createMessage } from '~~/server/services/message.service'
import { createMessageBodySchema, createMessageParamSchema } from '~~/server/validators/message.validator'

export default defineEventHandler(async (event) => {
  const param = await getValidatedRouterParams(event, createMessageParamSchema.parse)
  const body = await readValidatedBody(event, createMessageBodySchema.parse)

  return await createMessage({ ...body, chat_id: param.chat, user: event.context.user })
})
