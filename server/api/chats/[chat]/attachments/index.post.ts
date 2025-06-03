import type StorageFileApi from '@supabase/storage-js/dist/module/packages/StorageFileApi'
import { nanoid } from 'nanoid'
import { createAttachment } from '~~/server/services/attachment.service'
import { attachmentCreateSchema } from '~~/server/validators/attachment.validator'

const BUCKET_NAME = 'messages'

/**
 * Event handler for creating a signed upload URL and registering an attachment.
 *
 * - Validates the incoming request body using `attachmentCreateSchema`.
 * - Generates a signed upload URL for Supabase Storage.
 * - Retrieves the public URL for the uploaded file.
 * - Persists attachment metadata in the database.
 *
 * @param {import('h3').EventHandlerRequest} event - The incoming request event.
 * @returns {Promise<{ _id: string, upload_url: string }>} Attachment ID and signed upload URL.
 */
export default defineEventHandler(async (event) => {
  const supabase = useSupabaseStorage()

  const chat = getRouterParam(event, 'chat')

  const body = await readValidatedBody(event, attachmentCreateSchema.parse)

  const FILENAME = `files/${chat}/${nanoid(32)}.${body.filename.split('.')[1]}`

  const storage: StorageFileApi = supabase.from(BUCKET_NAME)

  const { data } = await storage.createSignedUploadUrl(FILENAME)
  const { data: { publicUrl: url } } = storage.getPublicUrl(FILENAME)

  const attachment = await createAttachment({ ...body, system_filename: FILENAME, url })

  return {
    _id: attachment._id,
    upload_url: data?.signedUrl,
  }
})
