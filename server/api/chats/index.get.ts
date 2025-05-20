import { getUserChats } from '~~/server/services/chat.service'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  return await getUserChats(user._id)
})
