import { getUserChatsWithPreview } from '~~/server/services/chat.service'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  const chats = await getUserChatsWithPreview(user._id)
  return { chats }
})
