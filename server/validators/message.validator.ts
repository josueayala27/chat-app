import { z } from 'zod'

export const messageParamSchema = z.object({
  chat: z.string().length(24),
})

export const createMessageBodySchema = z.object({
  type: z.enum(['text', 'image', 'video', 'file', 'audio', 'system']),
  content: z.string(),
})

export const userUpdateSchema = createMessageBodySchema.partial()
