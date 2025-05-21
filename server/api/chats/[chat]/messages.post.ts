import mongoose from 'mongoose'
import Message from '~~/server/models/Message'

export default defineEventHandler(async (event) => {
  const param = getRouterParam(event, 'chat')

  const body = await readBody<{ chat_id: string, content: string, type: string }>(event)
  const user = event.context.user

  const message = await Message.create({
    chat_id: new mongoose.Types.ObjectId(param),
    sender_id: new mongoose.Types.ObjectId(user._id),
    content: body.content,
    type: body.type,
    read_by: [{ user_id: user._id, read_at: new Date() }],
  })

  return message
})
