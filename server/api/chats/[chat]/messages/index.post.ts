import process from 'node:process'
import Ably from 'ably'
import { createMessage } from '~~/server/services/message.service'
import { createMessageBodySchema, messageParamSchema } from '~~/server/validators/message.validator'

/**
 * Creates an Ably REST client using the API key from environment variables.
 * @type {Ably.Rest}
 * @see {@link https://ably.com/docs/rest}
 */
const ably: Ably.Rest = new Ably.Rest(process.env.ABLY_API_KEY as string)

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(event, messageParamSchema.parse)
  const body = await readValidatedBody(event, createMessageBodySchema.parse)

  const message = await createMessage({
    ...body,
    chat_id: params.chat,
    user: event.context.user,
  })

  const channel = ably.channels.get(`channel:${params.chat}`)
  await channel.publish('event:new-message', message)

  return message
})
