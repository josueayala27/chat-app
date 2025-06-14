import { z } from 'zod'

export const messageParamSchema = z.object({
  chat: z.string().length(24),
})

export const getMessagesQuerySchema = z.object({
  before: z.string().length(24).optional(),
  after: z.string().length(24).optional(),
})

export const createMessageBodySchema = z.object({
  type: z.enum(['text', 'image', 'video', 'file', 'audio', 'system']),
  content: z.string(),
})

// Schema for updating an existing message
export const messageUpdateSchema = createMessageBodySchema.partial()
