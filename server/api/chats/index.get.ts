import { getUserChatsWithPreview } from '~~/server/services/chat.service'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  return await getUserChatsWithPreview(user._id)
})
