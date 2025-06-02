import { z } from 'zod'

export const attachmentCreateSchema = z.object({
  content_type: z.string(),
  filename: z.string(),
  size: z.number(),
})
