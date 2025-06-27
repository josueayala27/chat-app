import { z } from 'zod'

export const attachmentCreateSchema = z.object({
  content_type: z.string(),
  file_name: z.string(),
  size: z.number(),
})
