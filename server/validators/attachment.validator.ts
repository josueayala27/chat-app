import { z } from 'zod'

export const attachmentIdSchema = z.object({
  _id: z.string().length(24),
})

export const attachmentCreateSchema = z.object({
  content_type: z.string(),
  file_name: z.string(),
  size: z.number().positive(),
  sha256: z.string().length(64),
})

export const attachmentDeleteSchema = attachmentIdSchema
export const attachmentReadSchema = attachmentIdSchema
