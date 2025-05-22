import Ably from 'ably'
import { createMessage } from '~~/server/services/message.service'
import { createMessageBodySchema, messageParamSchema } from '~~/server/validators/message.validator'

const ably = new Ably.Rest('MkWAaA._QGpTg:r5t5EyUOOy8yOR5bfQWu4AzJaQFp8P6u-g7u3sGb6ac')

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, messageParamSchema.parse)
  const body = await readValidatedBody(event, createMessageBodySchema.parse)

  const message = await createMessage({ ...body, chat_id: params.chat, user: event.context.user })

  const channel = ably.channels.get(`chat:${params.chat}`)
  await channel.publish('message', message)

  return message
})
